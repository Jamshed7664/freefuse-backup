'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">my-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' : 'data-target="#xs-components-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' :
                                            'id="xs-components-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateInteractiveVideoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateInteractiveVideoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FollowersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FollowersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FollowingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FollowingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LandingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingTestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LandingTestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LibraryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LibraryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyVideosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyVideosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyVideosPublicComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyVideosPublicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OtpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OtpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileCompletionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileCompletionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicUserActivitiyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicUserActivitiyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicVideoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicVideoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublishFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublishFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchResultsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchResultsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SectionSpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SectionSpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThatsallComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThatsallComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrendingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrendingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadVideosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadVideosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserActivitiyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserActivitiyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WithOutLoginFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WithOutLoginFooterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' : 'data-target="#xs-directives-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' :
                                        'id="xs-directives-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                        <li class="link">
                                            <a href="directives/VideoJS.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">VideoJS</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' : 'data-target="#xs-injectables-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' :
                                        'id="xs-injectables-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                        <li class="link">
                                            <a href="injectables/CrudService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CrudService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' : 'data-target="#xs-pipes-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' :
                                            'id="xs-pipes-links-module-AppModule-2896dff3090be7eda7ffe51c1eb7981b"' }>
                                            <li class="link">
                                                <a href="pipes/DateAgoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateAgoPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MinuteSecondsPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MinuteSecondsPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SearchPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SecondsToMinutePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SecondsToMinutePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SizePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppServerModule-2a333f940348827b268b525427ca4af1"' : 'data-target="#xs-components-links-module-AppServerModule-2a333f940348827b268b525427ca4af1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppServerModule-2a333f940348827b268b525427ca4af1"' :
                                            'id="xs-components-links-module-AppServerModule-2a333f940348827b268b525427ca4af1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-70ca222916b1e5b6d6a356456c8814ba"' : 'data-target="#xs-components-links-module-HomeModule-70ca222916b1e5b6d6a356456c8814ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-70ca222916b1e5b6d6a356456c8814ba"' :
                                            'id="xs-components-links-module-HomeModule-70ca222916b1e5b6d6a356456c8814ba"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/FooterComponent-1.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-2.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-3.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-4.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent-5.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignupComponent.html" data-type="entity-link">SignupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignupComponent-1.html" data-type="entity-link">SignupComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CrudService.html" data-type="entity-link">CrudService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockService.html" data-type="entity-link">MockService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpConfigInterceptor.html" data-type="entity-link">HttpConfigInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuardService.html" data-type="entity-link">RoleGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});