/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import "zone.js/dist/zone-node";
import "reflect-metadata";
import { enableProdMode } from "@angular/core";

import * as express from "express";
import { join } from "path";
import { readFileSync } from "fs";

// Polyfills required for Firebase
(global as any).WebSocket = require("ws");
(global as any).XMLHttpRequest = require("xhr2");

import { renderModuleFactory } from "@angular/platform-server";
import { REQUEST, RESPONSE } from "@nguniversal/express-engine/tokens";
import { ValueProvider } from "@angular/core";

// Express server
enableProdMode();
const app = express();

const PORT = 5000;
const DIST_FOLDER = join(process.cwd(), "dist");
const APP_NAME = "my-app"; // CHANGE ME

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap
} = require(`./dist/my-app-server/main`);

// index.html template
const template = readFileSync(
  join(DIST_FOLDER, "browser", "index.html")
).toString();

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

app.engine("html", (_, options:any, callback) =>
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: REQUEST,
        useValue: options.req
      },
      {
        provide: RESPONSE,
        useValue: options.req.res
      }
    ]
  })(_, options, callback)
);

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get(
  "*.*",
  express.static(DIST_FOLDER, {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
// app.get("*", (req, res) => {
//   res.render("index", { req });
// });

// Serve static files from /browser
app.get(
  "*.*",
  express.static(join(DIST_FOLDER, "browser"), {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render(join(DIST_FOLDER, "browser", "index.html"), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:5000`);
});