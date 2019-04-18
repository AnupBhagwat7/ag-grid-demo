import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NotifierModule ,NotifierOptions} from 'angular-notifier';
import { AddUserComponent } from './components/user/add-user/add-user.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'middle',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
	theme: 'material',
	behaviour: {
		autoHide: 5000,
		onClick: false,
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 4
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease'
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50
		},
		shift: {
			speed: 300,
			easing: 'ease'
		},
		overlap: 150
	}
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserComponent,
    AddUserComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,    
    ReactiveFormsModule ,
    AgGridModule.withComponents(null),
    NotifierModule.withConfig( customNotifierOptions )
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
