import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import {} from '';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"


// Declarations
import { AppComponent } from './app.component';

// Reg
import { RegAppComponent } from './components/Registration/reg-app.component';
import { LogoComponent } from './components/logo/logo.component';

//404
import { NotFoudComponent } from './components/not-foud/not-foud.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { CountFieldComponent } from './components/game-page/count-field/count-field.component';
import { HeaderFieldComponent } from './components/game-page/header-field/header-field.component';
import { TableFieldComponent } from './components/game-page/table-field/table-field.component';


const routes = [
	{ path: "", component: RegAppComponent },
	// { path: "game", component: GamePageComponent },

	{ path: "**", component: NotFoudComponent },
	{ path: "**", redirectTo: "/" },
]

@NgModule({
	declarations: [
		AppComponent,
		RegAppComponent,
		LogoComponent,
		GamePageComponent,
		CountFieldComponent,
		HeaderFieldComponent,
		TableFieldComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(routes)
	],
	providers: [RegAppComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
