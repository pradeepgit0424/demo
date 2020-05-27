import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserType, UserTypeLst } from '../../models';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  adminDetails: LocalDataSource;
  CommomUserDetails: LocalDataSource;
  selectedUserTypeId: number;
  selectedDisplayName: string;
  selectedUserEmailId: string;
  selectedUserName: string;
  selectedUserPassword: string;
  userDetail = new UserType;
  userTypeId = 0; // variable to hold userType ID
  createdDate: Date;
  loggedInUserId: any; // login id of the current user
  userTypeList: typeof UserTypeLst = UserTypeLst; // constant variable that fill up type of users into dropdown
  userId = 0;
  isSubmitted = false;
  naCheckbox = false;

  userForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;
  SelectedUserDetail: any;
  userData: any[];
  isEdit: boolean;


  tableSettings = {
    columns: {
      //Column 1
      userName: {
        //Binding of machines to respective platforms
        title: 'User Name',
        width: '10%'
      },
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

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getAllUsers();
    //this.userDetails = new UserDetails();
  }
  // method for when a dropdown value is changed
  onChangeDropDown() {
    this.isSubmitted = false;
  }

  // method to get all users
  getAllUsers() {
    this.userData = USERLST;

    this.adminDetails = new LocalDataSource(this.userData);

    // this._userService.getAllUsers().subscribe(res => {
    //   this.allUsersDetails = res;
    //   this.adminDetails = new LocalDataSource(res.filter(users => users.userTypeId === 1));
    //   this.CommomUserDetails = new LocalDataSource(res.filter(users => users.userTypeId === 2));
    // });
  }

  // Function to edit a Brand
  editUser(UserTypeDetail: any) {
    this.isEdit = true;
    this.setUserDetails(UserTypeDetail.data);
    this.SelectedUserDetail = UserTypeDetail;
    console.log(this.SelectedUserDetail);
  }

  setUserDetails(userDetail: UserType) {
    setTimeout(() => {
      this.userForm.patchValue({
        firstName: userDetail.displayName,
        email: userDetail.userEmailId,
        lastName: userDetail.userName,
        password: userDetail.userPassword
      });
      this.selectedUserTypeId = userDetail.userTypeId;
      this.userId = userDetail.userId;
      this.naCheckbox = userDetail.isSuggestionRecipient;
    }, 100);
  }

  // fill the data into object to save
  fillUserDetailsToObject() {
    this.userDetail.userName = this.userForm.value.lastName;
    this.userDetail.displayName = this.userForm.value.firstName;
    this.userDetail.userEmailId = this.userForm.value.email;
    this.userDetail.userPassword = this.userForm.value.password;
    this.userDetail.userTypeId = this.selectedUserTypeId;
    this.userDetail.userId = this.userId;
    this.userDetail.isSuggestionRecipient = this.naCheckbox;
    if (this.userDetail.userId && this.userDetail.userId > 0) {
      this.userDetail.updatedBy = this.loggedInUserId;
    } else {
      this.userDetail.createdBy = this.loggedInUserId;
    }
  }


  clearAllVariables() {
    this.selectedUserTypeId = null;
    this.userForm.value.firstName = null;
    this.userForm.value.email = null;
    this.userForm.value.lastName = null;
    this.userForm.value.password = null;
    this.userId = 0;
    this.naCheckbox = false;
    this.userForm.reset();
  }
  // creates form control
  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}')
    ]);
    this.language = new FormControl('');
  }

  // new form is created
  createForm() {
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      language: this.language
    });
  }


  saveClick() {

    this.fillUserDetailsToObject();
    this.saveUserDetails();
    this.userData[0].displayName = this.selectedDisplayName;
    this.userData[0].userEmailId = this.selectedUserEmailId;
    this.userData[0].userType = this.userTypeId;
    this.userData[0].userName = this.selectedUserName;
    this.userData[0].userPassword = this.selectedUserPassword;
    this.adminDetails = new LocalDataSource(this.userData);
    console.log(this.userData[0]);
  }

  saveUser() {
    // fill the data into object to save
    this.fillUserDetailsToObject();
    this.isEdit = false;
    this.saveUserDetails();
    console.log();
    // metod to save brand details
    //this.saveUserDetails();

  }
  saveUserDetails() {
    // this._userService.createUser(this.userDetail).subscribe(res => {
    //   if (res) {
    //     if (this.userDetail.userId > 0) {
    //       this.alertSerive.create('User Updated Successfully', 'success', 2000, '', []);
    //     } else {
    //       this.alertSerive.create('User Created Successfully', 'success', 2000, '', []);
    //     }
    //     this.userDetail = new UserType();
    //     this.clearAllVariables();
    //     this.getAllUsers();
    //   } else {
    //     if (this.userDetail.userId > 0) {
    //       this.alertSerive.create(
    //         'User Updation failed', 'danger', 2000, '', []
    //       );
    //     } else {
    //       this.alertSerive.create(
    //         'User Creation failed', 'danger', 2000, '', []
    //       );
    //     }

    //   }
    // });

   }
  // submit method
  onSubmit() {
    if (this.userForm.valid) {
      this.saveUser();
      this.userForm.reset();
    } else {
      alert('error');
    }
  }

  // Function to delete a Parameter
  deleteUserPopup(UserTypeDetail: any) {
    // this.userIdToDelete = UserTypeDetail.data.userId;
    // this.alertSerive.create(
    //   'Delete User', // title
    //   'danger', // type
    //   0, // time
    //   'Are you sure want to delete?', // body
    //   [
    //     {
    //       text: 'Yes',
    //       buttonClass: 'btn btn-sm btn-jrrdan',
    //       onAction: () => new Promise((resolve: any) => {
    //         this.deleteUser();
    //       })

    //     },
    //     {
    //       text: 'No',
    //       buttonClass: 'btn btn-sm btn-clear'
    //     }
    //   ]
    // );
  }

  // method to delete user
  deleteUser() {
    // this._userService.deleteUser(this.userIdToDelete, true).subscribe(res => {
    //   this.clearAllVariables();
    //   this.getAllUsers();
    //   this.alertSerive.create(
    //     'User Deleted Successfully', // title
    //     'success', // type
    //     2000, // time
    //     '', // body
    //     []
    //   );
    // });
  }

  // Push a search term into table to search
  searchUser(term: string, type: string): void {
    switch (type) {
      case 'admin':
        if (term) {
          this.adminDetails.setFilter([
            // fields we want to include in the search
            {
              field: 'userName',
              search: term
            },
          ], false);
        } else {
          this.adminDetails.setFilter([], true);
        }
        break;
      case 'commonuser':
        if (term) {
          this.CommomUserDetails.setFilter([
            // fields we want to include in the search
            {
              field: 'userName',
              search: term
            },
          ], false);
        } else {
          this.CommomUserDetails.setFilter([], true);
        }
        break;
    }
  }
}




const USERLST = [
  {
    userId: 1,
    userName: 'John',
    displayName: 'Sean',
    //userType: 'Admin',
    userTypeId: 1,
    userEmailId: 'john@g.com',
    userPassword: 'W5gtrty'
  }
]


// class UserDetails {
//     userId: any;
//     userName: any;
//     displayName:any
//     //userType: 'Admin',
//     userTypeId: any;
//     userEmailId:any;
//     userPassword: any;
// }
