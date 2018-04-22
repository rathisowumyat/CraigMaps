import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import { FormsModule } from '@angular/forms';
import { QuillEditorModule } from 'ngx-quill-editor';
import { WebsiteService } from './services/website.service.client';
import { WidgetService } from './services/widget.service.client';
import { PageService } from './services/page.service.client';
import { UserService } from './services/user.service.client';
import {SharedService} from './services/shared.service';
import {AuthGuard} from './services/auth-guard.service';
import { WidgetHtmlComponent } from './components/widget/widget-edit/widget-html/widget-html.component';
import { HttpModule } from '@angular/http';
import { WidgetTextComponent } from './components/widget/widget-edit/widget-text/widget-text.component';
import { FlickrImageSearchComponent } from './components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import { FlickrService } from "./services/flickr.service.client";
import { DirectivesDirective } from './directives.directive';
import { SortableDirective } from './sortable.directive';
import { CraigmapsComponent } from './components/craigmaps/craigmaps.component';
import {CraigmapsService} from './services/craigmaps.service.client';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    PageListComponent,
    PageEditComponent,
    PageNewComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    WidgetHtmlComponent,
    DirectivesDirective,
    SortableDirective,
    WidgetTextComponent,
    FlickrImageSearchComponent,
    CraigmapsComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    QuillEditorModule,
    HttpModule,
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService, FlickrService, SharedService, AuthGuard, CraigmapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
