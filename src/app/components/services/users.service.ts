import { Injectable, Input } from "@angular/core";
import { UserCard } from "../models/user";

@Injectable({
	providedIn: "root"
})
export class UsersService {
	@Input() public UserCard;
	@Input() public PointCard;

	public usersGameArray = [];	// Current player points 
	public usersGameArrayCopy = [];
	public currantTotalPointsArray = [];	// Points received
	public choiceUsersToGame = [];	// Selected Players
	// Array with fake users
	public usersArrayCopy = [];
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

	// An array with points hit for the current round
	public currantPointsArray = [
		[
			{"dart": 0, "double": false},
			{"dart": 0, "double": false},
			{"dart": 0, "double": false},
		],
		[
			{"dart": 0, "double": false},
			{"dart": 0, "double": false},
			{"dart": 0, "double": false},
		],
		[
			{"dart": 0, "double": false},
			{"dart": 0, "double": false},
			{"dart": 0, "double": false},
		],
	];

	// Temporary array for multiplication
	public userDartValue = [
		[
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false},
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false},
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false}
		],
		[
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false},
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false},
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false}
		],
		[
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false},
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false},
			{"dart": undefined, "double": false, "active_1": true, "active_2": false, "active_3": false}
		],
	];

	public gameOver = {
		"victory_20_Steps": false,
		"victory_30_Steps": false,
		"draw_20": false,
		"draw_30": false,
		"additionalRounds": false
	};

	// Add New User
	public addUser(newUser: UserCard) {
		this.usersArray.push(newUser);
	}

	// Remove User
	public removeUser(name: string) {
		this.usersArray = this.usersArray.filter(user => user.name !== name);
		this.usersArrayCopy = this.usersArrayCopy.filter(user => user.name !== name);
	}

	public currantHitPointsFn(inputValue, idxUser, idxDart, factor) {
		const result = inputValue*factor;
		if(inputValue !== undefined) {
			this.userDartValue[idxUser][idxDart].dart = result;
			// double check to win
			if(factor !== 1){
				this.userDartValue[idxUser][idxDart].double = true;
			}
			if(factor == 1){
				this.userDartValue[idxUser][idxDart].double = false;
			}
			console.log(`Points - ${inputValue}`, `\nGamer - ${idxUser}`,`\nIndex(dart number) - ${idxDart}`, `\nFactor - ${factor}`, `\nResult - ${result}`,`\n`,this.userDartValue[idxUser]);
		}
		if(factor == 1){
			this.userDartValue[idxUser][idxDart].active_1 = true;
			this.userDartValue[idxUser][idxDart].active_2 = false;
			this.userDartValue[idxUser][idxDart].active_3 = false;
		}
		if(factor == 2){
			this.userDartValue[idxUser][idxDart].active_1 = false;
			this.userDartValue[idxUser][idxDart].active_2 = true;
			this.userDartValue[idxUser][idxDart].active_3 = false;
		}
		if(factor == 3){
			this.userDartValue[idxUser][idxDart].active_1 = false;
			this.userDartValue[idxUser][idxDart].active_2 = false;
			this.userDartValue[idxUser][idxDart].active_3 = true;
		}
	}

	// reset `gameOver` value
	public resetGameOver() {
		this.gameOver.victory_20_Steps = false;
		this.gameOver.victory_30_Steps = false;
		this.gameOver.draw_20 = false;
		this.gameOver.draw_30 = false;
	}

	// addition of points of three darts
	public sumPoits() {
		let sum;
		this.currantPointsArray.forEach((i, idx) => {
			let dbl = false;
			sum = 0;
			for(let j=0; j<3; j++) {
				sum += i[j].dart;
				if(i[j].double == true){
					dbl = true;
				}
			}
			this.currantTotalPointsArray[idx] = { "totalPoint": sum, "double": dbl };
		});
	}

	public push() {
		this.currantPointsArray.forEach((i, idx) => {
			for(let t=0; t<this.currantPointsArray.length; t++) {
				if(this.userDartValue[idx][t].dart == undefined) {
					i[t].double = false;
					i[t].dart = 0;
				}
				else {
					i[t].dart = this.userDartValue[idx][t].dart;
					i[t].double = this.userDartValue[idx][t].double;
				}
			}
		});
	}

	// Reset color Btn and double value
	public ResetActiveBtn() {
		this.userDartValue.filter(i => {
			for(let j=0; j<3; j++) {
				i[j].active_1 = true;
				i[j].active_2 = false;
				i[j].active_3 = false;
				i[j].double = false;
			}
		});
	}
}
