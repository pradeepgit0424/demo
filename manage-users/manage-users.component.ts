import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  adminDetails: LocalDataSource; 
  selectedUserTypeId: number;
  selectedDisplayName: string;
  selectedUserEmailId: string; 
  selectedUserName: string;
  selectedUserPassword: string;
  userTypeId = 0; // variable to hold userType ID
  createdDate: Date;
  userId = 0; 
  isSubmitted = false;
  userTypeList : any;
   // form group declarations
   userForm: FormGroup;
   firstName: FormControl;
   lastName: FormControl;
   email: FormControl;
   password: FormControl;
   language: FormControl;

   tableSettings = {
    columns: {
      //Column 1
      userName: {
        //Binding of machines to respective platforms
        title: 'User Name',
        width: '10%'
      },
      userType: {
        title: 'User Name ',
        width: '10%'
      }
    },
    //For Search Textbox in each column
    hideSubHeader: true,
    mode: 'external',
    //Actions Column for Edit/Delete the Entry
    actions: {
      //'Add New' in "Action" Column not required
      add: false,
      //Position of "Action" Column
      position: 'right'
    },
    //Edit Icon
    edit: {
      editButtonContent: '<img src=\'assets/images/edit_icon.png\' title=\'Edit data\'>'
    },
    //Delete Icon
    delete: {
      deleteButtonContent: '<img src=\'assets/images/delete_icon.png\' title=\'Delete data\'>'
    },

    //Positive and Negative style for table rows.
    rowClassFunction: (row) => {
      if (row.index % 2 === 0) {
        return 'positive';
      } else if (row.index % 2 === 1) {
        return 'negative';
      }
      return '';
    }
  };

  constructor() { }

  ngOnInit(): void {
  }
// method for when a dropdown value is changed
onChangeDropDown() {
  this.isSubmitted = false;
}
clearAllVariables(){

}
saveClick(){

}

}
