import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ParentTaskService } from '../../../services/parent-task.service';
import { ParentTask } from '../../../models/task';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'parent-task-search',
  templateUrl: './parent-search.component.html',
  styleUrls: ['./parent-search.component.css']
})
export class ParentSearchComponent implements OnInit {
  @Input()  name: string;
  @Output() parentSelected = new EventEmitter<ParentTask>();

  ParentTasks: ParentTask[];
  SearchKey: string;
  SelectedParentID: number;
  enableAdd:boolean;

  constructor(private parentService: ParentTaskService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.parentService.getParentTaskList(this.SearchKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.ParentTasks = response.Data;
        }
      });
      this.enableAdd = false;
  }

  
  searchParent(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  selectParent(parentID: number){
    this.SelectedParentID = parentID;
    this.enableAdd = true;
  }

  addParent(){

    this.parentService.getParentTask(this.SelectedParentID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.parentSelected.emit(response.Data);
            $('#parentSearchModel').modal('toggle');
          }
      });
  }
}
