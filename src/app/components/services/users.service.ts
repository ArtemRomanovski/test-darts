import { Injectable, Input } from "@angular/core";
import { UserCard } from "../models/user";

@Injectable({
	providedIn: "root"
})
export class UsersService {
	@Input() UserCard;
	@Input() PointCard;

	// Current player points 
	public usersGameArray = [];
	public usersGameArrayCopy = [];
	// Points received
	public currantTotalPointsArray = [];
	// Selected Players
	public choiceUsersToGame = [];
	// Array with fake users
	public usersArray: UserCard[] = [
		{
			name: "Jack",
			email: "Jack@gmail.com",
			active: false
		},
		{
			name: "John",
			email: "John@gmail.com",
			active: false
		},
		{
			name: "Timmy",
			email: "Timmy@gmail.com",
			active: false
		},
		{
			name: "Alice",
			email: "Alice@gmail.com",
			active: false
		},
		{
			name: "Brad",
			email: "Brad@gmail.com",
			active: false
		}
	];

	constructor() { }
	// Add New User
	public addUser(newUser: UserCard) {
		this.usersArray.push(newUser);
	};
	// Remove User
	public removeUser(name: string) {
		return this.usersArray = this.usersArray.filter(user => user.name !== name);
	};
};




