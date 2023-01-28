import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ConfigModule } from './config/config.module';
import { QueueModule } from './queue/queue.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AsideComponent } from './core/components/aside/aside.component';
import { TooltipComponent } from './core/components/tooltip/tooltip.component';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AsideComponent,
    TooltipComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ConfigModule,
    QueueModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
