import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

private readonly notifier: NotifierService;

// row data and column definitions
private users: User[];
private columnDefs: ColDef[];

// gridApi and columnApi
private api: GridApi;
private columnApi: ColumnApi;
private userToBeEditedFromParent : any ;

// inject the userService
constructor(private userService: UserService, 
  private notifierService:NotifierService,
  private router: Router) {
    this.columnDefs = this.createColumnDefs();
    this.notifier = notifierService;
}

// on init, subscribe to the user data
ngOnInit() {
    this.userService.getUsers().subscribe(
        data => {
            this.users = data
        },
        error => {
            console.log(error);
        }
    )
}

// one grid initialisation, grap the APIs and auto resize the columns to fit the available space
onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;    
    this.api.sizeColumnsToFit();    
}

// create some simple column definitions
private createColumnDefs() {
    return [
        {headerName: 'First Name', field: 'fname', filter: true, enableSorting:true, editable:true, sortable: true},
        {headerName: 'Last Name', field: 'lname', filter: true, editable:true, sortable: true},
        {headerName: 'Email', field: 'email', filter: true,sortable:true, editable:true, cellRenderer:'<a href="edit-user">{{email}}</a>'},
        {headerName: 'Age', field: 'age', filter: true, editable:true, sortable: true},
        {headerName: 'Mobile', field: 'mobile', filter: true, editable:true}
    ]
}

status: any;

//Update user
editUser(){
   
  if(this.api.getSelectedRows().length == 0){
    this.notifier.notify("error", "Please select a row for editing");
    return;
  }
  var row  = this.api.getSelectedRows();

  this.userService.editUser(row[0])
  .subscribe( data => {
    this.notifier.notify("success", "User updated successfully!!");
    console.log('Edit call output' );
    console.log(data);
    //this.router.navigate(['users']);
  });

}

//Get all rows
getRowData() {
  var rowData = [];
  this.api.forEachNode(function(node) {
    rowData.push(node.data);
  });
  console.log("Row Data:");
  console.log(rowData);
}

//Delete user
deleteUser() {

    var selectedRows = this.api.getSelectedRows();

    if(selectedRows.length == 0){
      this.notifier.notify("error", "Please select atleat one User for deletion");
      return;
    }
    this.userService.deleteUser(selectedRows[0].id).subscribe(data => this.status = data );
    console.log("Deletion status: "+ this.status);
  
    this.ngOnInit();
    this.api.refreshRows(null);
    this.notifier.notify('success', 'You have successfully deleted the user');
  
}

//Get updated row
onSelectionChanged() {
    var selectedRows = this.api.getSelectedRows();
    this.userToBeEditedFromParent = selectedRows;
    console.log(this.userToBeEditedFromParent);

    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index > 5) {
        return;
      }
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.id;
    });
    if (selectedRows.length >= 5) {
      selectedRowsString += " - and " + (selectedRows.length - 5) + " others";
    }
  }

  //Get edited row
  newData = [];
  onCellEditingStopped(e) {
   //console.log(e.data);

   this.api.forEachNode(node=>{
       if(!node.data.id)
           this.newData.push(node.data)
   });
   console.log("On editing stopped");
   console.log(this.newData);
  }

  //Get updated row  
  onrowValueChanged(row){
    console.log("onrowValueChanged: ");
    console.log("onrowValueChanged: "+row);
  }

}
