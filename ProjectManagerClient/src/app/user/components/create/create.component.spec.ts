// tslint:disble
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CreateComponent} from './create.component';
import {Component, Directive} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder} from '@angular/forms';
import {AlertService} from '../../../shared/services/alert.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';
import { ApiResponse } from '../../../shared/models/shared';

class MockUserService {
  users: User[];
constructor(){
   this.users =<User[]>[{First_Name:"hari", Last_Name:"Yerra",Employee_ID:159159}, 
                       {First_Name:"kris", Last_Name:"y",Employee_ID:159151}
                      ];
}
  getUsersList(searchKey:string, sortKey:string):Observable<ApiResponse<User[]>>{

    var response = <ApiResponse<User[]>>{Success:true, Data:this.users};
    return Observable.of(response);
  }
}

class MockAlertService {
}

describe('CreateComponent', () => {
  let fixture;
  let component:CreateComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateComponent
      ],
      imports:[FormsModule, ReactiveFormsModule],
      providers: [
        {provide: UserService, useClass: MockUserService},
        FormBuilder,
        {provide: AlertService, useClass: MockAlertService},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));


  it('should run #createForm()', async(() => {
    const result = component.createForm();
    expect(component.userForm.controls["firstName"].value=="");
  }));

  it('should run #ngOnInit()', async(() => {
    
  }));

  it('should run #refreshList()', async(() => {
     const result = component.refreshList();
     expect(component.Users.length==2);

  }));

  it('should run #addorUpdateUser()', async(() => {
    // const result = component.addorUpdateUser();
  }));

  it('should run #addUser()', async(() => {
    // const result = component.addUser();
  }));

  it('should run #editUser()', async(() => {
    // const result = component.editUser(userID);
  }));

  it('should run #updateUser()', async(() => {
    // const result = component.updateUser();
  }));

  it('should run #deleteUser()', async(() => {
    // const result = component.deleteUser(userID);
  }));

  it('should run #reset()', async(() => {
    // const result = component.reset();
  }));

  it('should run #search()', async(() => {
    // const result = component.search(searchValue);
  }));

  it('should run #sort()', async(() => {
    // const result = component.sort(sortKey);
  }));

});