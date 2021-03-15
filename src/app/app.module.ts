import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RegAppComponent } from "./components/Registration/reg-app.component";
import { LogoComponent } from "./components/logo/logo.component";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
	declarations: [
		AppComponent,
		RegAppComponent,
		LogoComponent,
		GamePageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule
	],
	providers: [RegAppComponent],
	bootstrap: [AppComponent]
})
export class AppModule { };
