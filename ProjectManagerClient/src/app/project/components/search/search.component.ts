import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'project-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()  name: string;
  @Output() projectSelected = new EventEmitter<Project>();

  Projects: Project[];
  SortKey: string;
  SearchKey: string;
  SelectedProjectID: number;
  enableAdd:boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.projectService.getProjects(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.Projects = response.Data;
        }
      });
      this.enableAdd = false;
  }

  
  searchProject(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  selectProject(projectID: number){
    this.SelectedProjectID = projectID;
    this.enableAdd = true;
  }

  addProject(){

    this.projectService.getProject(this.SelectedProjectID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.projectSelected.emit(response.Data);
            $('#projectSearchModel').modal('toggle');
          }
      });
  }
}
