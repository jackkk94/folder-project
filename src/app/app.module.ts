import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TreeListComponent } from './components/views/tree-list/tree-list.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import {MainService} from './services/main.service';
import { TreeNodeComponent } from './components/views/tree-node/tree-node.component';
@NgModule({
  declarations: [
    TreeListComponent,
    MainPageComponent,
    TreeNodeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MainService],
  bootstrap: [MainPageComponent]
})
export class AppModule { }
