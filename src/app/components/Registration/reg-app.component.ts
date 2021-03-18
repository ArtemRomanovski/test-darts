import { Component, OnInit } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserCard } from "../models/user";
import { UsersService } from "../services/users.service";

@Component({
	selector: "app-reg-app",
	templateUrl: "./reg-app.component.html",
	styleUrls: ["./reg-app.component.scss"],
	providers: [UsersService]
})

export class RegAppComponent implements OnInit {
	public regExpEmail = [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.)+([a-zA-Z0-9-]+)*$/];
	public showErr_selectPlayers = false;
	public showErr_chooseGame = false;
	public toggleGamePage = false;
	public choice_501 = false;
	public choice_301 = false;
	public showErr = false;
	public toggle = true;
	public maxLength = 20;
	public disabled = "";
	public searchIcon = faSearch;
	public name = "";
	public email: string;
	public findName;

	constructor(public userService: UsersService) {}

	public ngOnInit() {
		console.log(this.userService.usersArray);
	}

	// add New User
	public addUser(nickName, email) {
		const newUser: UserCard = {
			name: this.name,
			email: this.email,
			active: false
		};
		// check valid
		if (nickName.valid === true && email.valid === true) {
			newUser.name = nickName.value;
			newUser.email = email.value;
			this.userService.addUser(newUser);
			this.toggle = !this.toggle;
		}
		this.search("");
	}

	public remove(name: string) {
		this.userService.removeUser(name);
	}

	// change registr page
	public toggleCards() {
		this.toggle = !this.toggle;
		this.showErr = false;
	}

	public togglePage() {
		this.toggleGamePage = !this.toggleGamePage;
	}

	public playerChoice(i: number, findUser) {
		if(this.userService.choiceUsersToGame.length !== 0) {
			if (this.userService.choiceUsersToGame.length < 3) {
				if(findUser !== undefined) {
					this.userService.choiceUsersToGame.push(findUser);
				}
				else this.userService.choiceUsersToGame.push(this.userService.usersArray[i]);
			}
			else {
				this.userService.choiceUsersToGame[0].active = false;
				this.userService.choiceUsersToGame.shift();
				if(findUser !== undefined) {
					this.userService.choiceUsersToGame.push(findUser);
				}
				else this.userService.choiceUsersToGame.push(this.userService.usersArray[i]);
			}
		}
		else {
			if(findUser !== undefined) {
				this.userService.choiceUsersToGame.push(findUser);
			}
			else {
				this.userService.choiceUsersToGame.push(this.userService.usersArray[i]);
			}
		}
	}

	public Game_501() {
		this.choice_501 = true;
		this.choice_301 = false;
		this.showErr_chooseGame = false;
	}

	public Game_301() {
		this.choice_301 = true;
		this.choice_501 = false;
	}

	// Checking the selection of all players and the type of game 
	public checkStart() {
		if (this.userService.choiceUsersToGame.length === 3 && this.choice_501 === true) {
			this.togglePage();
			this.showErr_selectPlayers = false;
			this.showErr_chooseGame = false;
		}
		if(this.userService.choiceUsersToGame.length < 3) {
			this.showErr_selectPlayers = true;
		}
		if(this.userService.choiceUsersToGame.length === 3) {
			this.showErr_selectPlayers = false;
		}
		if(this.choice_501 === false) {
			this.showErr_chooseGame = true;
		}
		if(this.choice_501 === true) {
			this.showErr_chooseGame = false;
		}
	}

	public search(value) {
		this.userService.usersArrayCopy = this.userService.usersArray.filter(key => key.name.toLowerCase().includes(value.toLowerCase()));
		if(this.userService.usersArrayCopy.length == 1){
			this.findName = this.userService.usersArrayCopy[0];
		}
		else {
			return this.findName = undefined;
		}
	}

	public findUser() {
		if(this.findName == undefined) {
			this.showErr = true;
		}
		if(this.findName !== undefined){
			const i = undefined;
			const findUser = this.findName;
			findUser.active = true;
			this.playerChoice(i, findUser);
			this.showErr = false;
		}
	}

	//  cange color active User field
	public changeColor(item) {
		if(this.userService.usersArray[item].active == false) {
			this.userService.usersArray[item].active = true;
		}
		else {
			this.userService.usersArray[item].active = false;
		}
	}

	//  cange color active User field
	// public changeColor(value) {
	// 	this.userService.usersArray.forEach(item => {
	// 		if(item.name == value && item.active == false) {
	// 			item.active = true;
	// 		}
	// 		else if(item.name == value && item.active == true) {
	// 			item.active = false;
	// 		};
	// 		console.log(item);	
	// 	});
	// };

}
