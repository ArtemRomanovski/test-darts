import { Injectable, Input } from '@angular/core';
import { from } from 'rxjs';
import { UserCard } from "../models/user";

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	@Input() UserCard;

	public pointsArray = []
	public usersGameArray = [];
	public usersArray: UserCard[] = [
		{
			name: "Jack",
			email: "Jack@gmail.com"
		},
		// {
		// 	name: "John",
		// 	email: "John@gmail.com"
		// },
		{
			name: "Timmy",
			email: "Timmy@gmail.com"
		},
		{
			name: "Alice",
			email: "Alice@gmail.com"
		},
		// {
		// 	name: "Brad",
		// 	email: "Brad@gmail.com"
		// }

	]

	constructor() { }

	// Get All Users
	// public getAll() {
	// 	return this.usersArray;
	// }

	// Add User
	// public addUser(name: string, email: string) {
	// 	this.usersArray.push({ name, email });
	// 	return this.usersArray
	// }

	public addUser(newUser: UserCard) {
		this.usersArray.push(newUser)
	}

	// Remove User
	public removeUser(name: string) {
		return this.usersArray = this.usersArray.filter(user => user.name !== name);
	}




}




