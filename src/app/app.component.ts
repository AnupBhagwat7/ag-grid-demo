import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Component( {
  selector: 'my-app',
  template: `
    <h1>Hello World</h1>    
  `
} )
export class AppComponent {

  rowData = [];

  ngOnInit(){
  
  }
}
