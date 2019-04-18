import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
@Component( {
  selector: 'my-app',
  template: `
    <h1>Hello World</h1>
    <notifier-container></notifier-container>
  `
} )
export class UserComponent implements OnInit {


private readonly notifier: NotifierService;

// row data and column definitions
private users: User[];
private columnDefs: ColDef[];

// gridApi and columnApi
private api: GridApi;
private columnApi: ColumnApi;

// inject the userService
constructor(private userService: UserService, private notifierService:NotifierService) {
    this.columnDefs = this.createColumnDefs();
    this.notifier = notifierService;
}

// on init, subscribe to the athelete data
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
        {headerName: 'First Name', field: 'fname', filter: true, enableSorting:true, editable:true},
        {headerName: 'Last Name', field: 'lname', filter: true, editable:true},
        {headerName: 'Email', field: 'email', filter: true,sortable:true, cellRenderer:'<a href="edit-user">{email}</a>'},
        {headerName: 'Age', field: 'age', filter: true, editable:true},
        {headerName: 'Mobile', field: 'mobile', filter: true, editable:true}
    ]
}

status: any;

addUser(){

}

editUser(){
  console.log("My selection"+ this.api.getSelectedRows.toString)

  let newData = [];
   this.api.forEachNode(node=>{
       if(!node.data.id)
           newData.push(node.data)
   });
   console.log(newData);
  console.log(this.getRowData());
}

getRowData() {
  var rowData = [];
  this.api.forEachNode(function(node) {
    rowData.push(node.data);
  });
  console.log("Row Data:");
  console.log(rowData);
}

deleteUser() {

    var selectedRows = this.api.getSelectedRows();

    if(selectedRows.length == 0){
      this.notifier.notify("error", "Please select atleat one User for deletion");
      return;
    }
    this.userService.deleteUser(selectedRows[0].id).subscribe(data => this.status = data );
    console.log("Deletion status: "+ this.status);
    /* subscribe(data => {
        this.users = this.users.filter(u => u !== selectedRows[0]);
    }); */
    this.ngOnInit();
    this.api.refreshRows(null);
    this.notifier.notify('success', 'You have successfully deleted the user');
  
}

onSelectionChanged() {
    var selectedRows = this.api.getSelectedRows();
    console.log(selectedRows);

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
    console.log(selectedRowsString);
    //document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

  onCellEditingStopped(e) {
    console.log(e.data);

    let newData = [];
   this.api.forEachNode(node=>{
       if(!node.data.id)
           newData.push(node.data)
   });
   console.log(newData);
  }


  onrowValueChanged(row){
    console.log("onrowValueChanged: ");
    console.log("onrowValueChanged: "+row);
  }

}
