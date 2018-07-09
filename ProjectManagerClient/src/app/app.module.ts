//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

//components
import { AppComponent } from './app.component';
import { CreateComponent as UserCreateComponent } from './user/components/create/create.component';
import { CreateComponent as ProjectComponent } from './project/components/create/create.component';
import { SearchComponent as UserSearchComponent } from './user/components/search/search.component';
import { CreateComponent as TaskCreateComponent } from './task/components/create/create.component';
import { SearchComponent as ProjectSearchComponent} from './project/components/search/search.component';
import { ParentSearchComponent } from './task/components/search/parent-search/parent-search.component';
import { ViewComponent as TaskViewComponent} from './task/components/view/view.component';

//services
import { UserService } from './user/services/user.service'
import { ProjectService } from './project/services/project.service';
import { ParentTaskService } from './task/services/parent-task.service';
import { AlertService } from './shared/services/alert.service'
import {SlimLoadingBarService } from 'ng2-slim-loading-bar';

//routing
import { RouterModule, Routes } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

//directive
import { DateCompareValidatorDirective } from './shared/directives/datecompare.directive';
import { NgbDateMomentParserFormatter } from './shared/date.formatter';

//routes
const routes: Routes = [
  {
    path: 'user',
    children: [
            { path: 'add', component: UserCreateComponent }
    ]
  },
  {
    path: 'project',
    children: [
            { path: 'add', component: ProjectComponent }
    ]
  },
  {
    path: 'task',
    children: [
            { path: 'add', component: TaskCreateComponent },
            { path: 'view', component: TaskViewComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    ProjectComponent,
    UserSearchComponent,
    TaskCreateComponent,
    ProjectSearchComponent,
    ParentSearchComponent,
    DateCompareValidatorDirective,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFontAwesomeModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    ProjectService,
    ParentTaskService,
    AlertService,
    ToastrService,
    SlimLoadingBarService,
    {provide: NgbDateParserFormatter, useFactory: () => { return new NgbDateMomentParserFormatter("DD/MM/YYYY") } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
