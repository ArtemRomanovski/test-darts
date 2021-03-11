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
			email: "Jack@gmail.com"
		},
		{
			name: "John",
			email: "John@gmail.com"
		},
		{
			name: "Timmy",
			email: "Timmy@gmail.com"
		},
		{
			name: "Alice",
			email: "Alice@gmail.com"
		},
		{
			name: "Brad",
			email: "Brad@gmail.com"
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




