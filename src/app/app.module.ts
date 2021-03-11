import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RegAppComponent } from "./components/Registration/reg-app.component";
import { LogoComponent } from "./components/logo/logo.component";
import { GamePageComponent } from "./components/game-page/game-page.component";

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
	],
	providers: [RegAppComponent],
	bootstrap: [AppComponent]
})
export class AppModule { };
