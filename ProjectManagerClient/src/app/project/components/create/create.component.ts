import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../user/services/user.service';
import { ProjectService } from '../../services/project.service';
import { AlertService } from '../../../shared/services/alert.service';
import { User } from '../../../user/models/user';
import { Project } from '../../models/project';

import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'project-add',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  Projects: Project[];
  projectForm: FormGroup;

  setDates: boolean;
  userAction: string;
  SortKey: string;
  SearchKey: string;
  Manager: User;

  constructor(private projectService: ProjectService, private userService: UserService,
    private formbuilder: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  createForm() {
    this.projectForm = this.formbuilder.group({
      projectName: ['', Validators.required],
      setDates: false,
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      priority: 0,
      manager: '',
      projectId: ''
    });

    this.userAction = 'Add';
  }

  reset() {
    this.projectForm.reset();
    this.projectForm.get('priority').setValue(0);

    this.userAction = 'Add';
    this.Manager = null;
    this.setDates = false;
  }

  ngOnInit() {

    this.refreshList();
    this.addValidations();

  }

  refreshList() {
    this.projectService.getProjects(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.Projects = response.Data;
          console.log(response.Data);
        }
        else {
          this.Projects = response.Data;
          this.alertService.error('Error occured while fetching products', 'Error', 3000);
        }
      });
  }


  search(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  addorUpdateProject() {
    if (this.projectForm.valid) {
      if (this.userAction == 'Add') {
        this.addProject();
      }
      else {
        this.updateProject();
      }
    }
  }

  addProject() {
    const newProject = <Project>{
      Project: this.projectForm.controls['projectName'].value,
      Priority: this.projectForm.controls['priority'].value
    };

    if (this.Manager) {
      newProject.Manager_ID = this.Manager.User_ID;
    }

    if (this.setDates) {
      newProject.Start_Date = moment(this.projectForm.controls['startDate'].value).add(-1, 'months').toDate();
      newProject.End_Date = moment(this.projectForm.controls['endDate'].value).add(-1, 'months').toDate();
    }

    this.projectService.addProject(newProject)
      .subscribe(response => {
        if (response.Success == true) {
          this.alertService.success('Project added successfully.', 'Success', 3000);
          this.refreshList();
          this.reset();
        }
        else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
  }

  updateProject() {

    const updateProject = <Project>{
      Project_ID: this.projectForm.controls['projectId'].value,
      Project: this.projectForm.controls['projectName'].value,
      Priority: this.projectForm.controls['priority'].value
    };

    if (this.Manager) {
      updateProject.Manager_ID = this.Manager.User_ID;
    }

    if (this.setDates) {
      updateProject.Start_Date = moment(this.projectForm.controls['startDate'].value).add(-1, 'months').toDate();
      updateProject.End_Date = moment(this.projectForm.controls['endDate'].value).add(-1, 'months').toDate();
    }

    this.projectService.editProject(updateProject)
      .subscribe(response => {
        console.log(response);
        if (response.Success == true) {
          this.alertService.success('Project updated successfully!', 'Success', 3000);
          this.refreshList();
          this.reset();
        }
        else
          this.alertService.error(response.Message, 'Error', 3000);
      });
  }

  editProject(projectID) {

    this.projectService.getProject(projectID)
      .subscribe(response => {
        if (response.Success == true) {

          this.projectForm.controls["projectName"].setValue(response.Data.Project);
          this.projectForm.controls["projectName"].setValidators(Validators.required);
          this.projectForm.controls["priority"].setValue(response.Data.Priority);
          this.projectForm.controls["projectId"].setValue(response.Data.Project_ID);

          var startDate, endDate;
          if (response.Data.Start_Date || response.Data.End_Date) {
            this.projectForm.controls["setDates"].setValue(true);

            startDate = <NgbDateStruct>{
              year: response.Data.Start_Date.getFullYear(),
              month: response.Data.Start_Date.getMonth() + 1, day: response.Data.Start_Date.getDate()
            };

            endDate = <NgbDateStruct>{
              year: response.Data.End_Date.getFullYear(),
              month: response.Data.End_Date.getMonth() + 1, day: response.Data.End_Date.getDate()
            };

            this.projectForm.controls["startDate"].setValue(startDate);
            this.projectForm.controls["endDate"].setValue(endDate);

          }
          else {
            this.projectForm.controls["setDates"].setValue(false);
          }

          if (response.Data.Manager_ID) {
            this.userService.getUser(response.Data.Manager_ID)
              .subscribe(response => {
                this.Manager = response.Data;
                if (response.Data) {
                  this.projectForm.controls["manager"].setValue(`${this.Manager.First_Name} ${this.Manager.Last_Name}`);
                }
              });
          }
          this.userAction = 'Update';
        }
        else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
  }

  suspendProject(projectID) {
    this.projectService.deleteProject(projectID)
      .subscribe(response => {
        if (response.Success == true) {
          this.alertService.success('Project suspended successfully!', 'Success', 3000);
          this.refreshList();
        }
        else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
  }


  sort(sortKey: string) {
    this.SortKey = sortKey;
    this.refreshList();
  }

  //callback from User search popup
  onManagerSelected(manager: User) {
    this.Manager = manager;
    this.projectForm.get('manager').setValue(`${this.Manager.First_Name} ${this.Manager.Last_Name}`);
  }

  addValidations() {
    //date custom validators
    this.projectForm.get('setDates').valueChanges.subscribe(
      (setDate: boolean) => {
        this.setDates = setDate;

        if (setDate) {

          var today = new Date();
          var startDate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };

          this.projectForm.get('startDate').setValidators([Validators.required]);
          this.projectForm.get('startDate').setValue(startDate);
          this.projectForm.get('startDate').enable({ emitEvent: true });

          var endDate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
          this.projectForm.get('endDate').setValidators([Validators.required]);
          this.projectForm.get('endDate').setValue(endDate);
          this.projectForm.get('endDate').enable({ emitEvent: true });
        }
        else {
          this.projectForm.get('startDate').clearValidators();
          this.projectForm.get('startDate').setValue('');
          this.projectForm.get('startDate').disable({ emitEvent: true });

          this.projectForm.get('endDate').clearValidators();
          this.projectForm.get('endDate').setValue('');
          this.projectForm.get('endDate').disable({ emitEvent: true });
        }

      });

    this.projectForm.get('endDate').valueChanges.subscribe(
      (endDatePicked: Date) => {

        var startDateSelected = this.projectForm.get('startDate').value;

        var endDate = moment(endDatePicked).add(-1, 'months').toDate();
        var startDate = moment(startDateSelected).add(-1, 'months').toDate();

        console.log(startDate);
        console.log(endDate);

        if (startDate && endDate) {
          if (endDate < startDate) {
            this.projectForm.controls['endDate'].setErrors({ 'incorrect': true });
          }
        }

      });

    this.projectForm.get('startDate').valueChanges.subscribe(
      (startDatePicked: Date) => {

        var endDateSelected = this.projectForm.get('endDate').value;

        var endDate = moment(endDateSelected).add(-1, 'months').toDate();
        var startDate = moment(startDatePicked).add(-1, 'months').toDate();

        console.log(startDate);
        console.log(endDate);

        if (endDate && startDate) {
          if (startDate > endDate) {
            this.projectForm.controls['startDate'].setErrors({ 'incorrect': true });
          }
        }

      });
  }
}