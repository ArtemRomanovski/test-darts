import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input, ViewChild, ElementRef, Output } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, Validator, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { from, Observable } from 'rxjs';
import { UserCard } from '../models/user';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'app-reg-app',
	templateUrl: './reg-app.component.html',
	styleUrls: ['./reg-app.component.scss'],
	providers: [UsersService]
})
export class RegAppComponent implements OnInit {

	// @ViewChild("nickName") nickName: ElementRef
	// @ViewChild("nickEmail") nickEmail: ElementRef
	// @Input() UserCard;
	// @Input() usersArray;

	public fieldColor: string;

	public name: string = "";
	public email: string;
	// public newUser: UserCard;
	public toggle: boolean = true;
	public toggleGamePage: boolean = false;
	public disabled: string = "";

	public choice_501: boolean = false;
	public choice_301: boolean = false;



	constructor(public userService: UsersService) {

	}

	ngOnInit() {
	}

	// addUser() {
	// 	this.name = this.nickName.nativeElement.value
	// 	this.email = this.nickEmail.nativeElement.value
	// 	this.newUser = { name: this.name, email: this.email }
	// 	this._http.usersArray.push({ name: this.name, email: this.email })

	// }
	public addUser() {
		const newUser: UserCard = {
			name: this.name,
			email: this.email,
		}
		console.log(newUser)
		this.userService.addUser(newUser);
	}

	public remove(name: string) {
		this.userService.removeUser(name);
	}

	// change registr page
	public toggleCards() {

		if (this.name == "") {
			alert(" Поле nickName пустое")
		}
		else this.toggle = !this.toggle
	}

	public togglePage() {
		this.toggleGamePage = !this.toggleGamePage
	}



	public playerChoice(i: number) {
		console.log(i)
		if (this.userService.choiceUsersToGame.length < 3) {
			this.userService.choiceUsersToGame.push(this.userService.usersArray[i]);

		}
		else {
			this.userService.choiceUsersToGame.shift();
			this.userService.choiceUsersToGame.push(this.userService.usersArray[i])
		}
	}

	public Game_501() {
		this.choice_501 = true;
		this.choice_301 = false;
	}

	public Game_301() {
		this.choice_501 = false;
		this.choice_301 = true;
	}

	public checkStart() {
		if ((this.userService.choiceUsersToGame.length === 3) && (this.choice_501 === true)) {
			this.togglePage();
		}
		console.log(this.userService.choiceUsersToGame, this.choice_501 === true);

	}





}
