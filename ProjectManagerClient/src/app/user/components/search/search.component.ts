import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
declare var $ :any;

@Component({
  selector: 'user-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()  name: string;
  @Output() userSelected = new EventEmitter<User>();

  Users: User[];
  SortKey: string;
  SearchKey: string;
  SelectedUserID: number;
  enableAdd:boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.userService.getUsersList(this.SearchKey, this.SortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.Users = response.Data;
        }
      });
      this.enableAdd = false;
  }

  
  searchUser(searchValue: string) {
    this.SearchKey = searchValue;
    this.refreshList();
  }

  selectUser(userID: number){
    this.SelectedUserID = userID;
    this.enableAdd = true;
  }

  addUser(){

    this.userService.getUser(this.SelectedUserID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.userSelected.emit(response.Data);
            $('#userSearchModel').modal('toggle');
          }
      });
  }
}