import { ServerModule } from '@angular/platform-server';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const routes: Routes = [ ];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  bootstrap: [AppComponent],
  declarations: [],
})
export class AppServerModule {}
