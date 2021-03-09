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
		if (this.userService.usersGameArray.length < 3) {
			this.userService.usersGameArray.push(this.userService.usersArray[i]);

		}
		else {
			this.userService.usersGameArray.shift();
			this.userService.usersGameArray.push(this.userService.usersArray[i])
		}
	}

	public checkStart() {
		if (this.userService.usersGameArray.length === 3) {
			this.disabled = "game"
		}
	}





}
