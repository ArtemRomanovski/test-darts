import { isNgTemplate } from "@angular/compiler";
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
	public maxLength: number = 20;
	public name: string = "";
	public email: string;
	public toggle: boolean = true;
	public toggleGamePage: boolean = false;
	public disabled: string = "";
	public choice_501: boolean = false;
	public choice_301: boolean = false;
	public findName;
	public searchIcon = faSearch
	public showErr: boolean = false;

	constructor(public userService: UsersService) {};

	ngOnInit() {
		console.log(this.userService.usersArray);
	};

	// add New User
	public addUser(nickName, email) {
		const newUser: UserCard = {
			name: this.name,
			email: this.email,
			active: false
		};
		// check valid
		if ((nickName.valid === true && email.valid === true)) {
			newUser.name = nickName.value;
			newUser.email = email.value;
			this.userService.addUser(newUser);
			this.toggle = !this.toggle;
		};
	};

	public remove(name: string) {
		this.userService.removeUser(name);
	};

	// change registr page
	public toggleCards() {
		this.toggle = !this.toggle;
		this.showErr = false;
	};

	public togglePage() {
		this.toggleGamePage = !this.toggleGamePage;
	};

	public playerChoice(i: number, findUser: object) {
		// Проверка пустой ли массив
		if(this.userService.choiceUsersToGame.length !== 0) {
			console.log(this.userService.choiceUsersToGame);
			// Проверка на одинаковых игроков
			// this.userService.choiceUsersToGame.forEach((elem, idx) => {
				// if (elem.name !== this.userService.usersArray[i].name && elem.name !== findUser) {
					// Проверка на количество игроков
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
			};	
				// }
				// else console.log("уже игрок есть такой");
			// });
		}
		else {
			if(findUser !== undefined) {
				this.userService.choiceUsersToGame.push(findUser);				
			}
			else {
				this.userService.choiceUsersToGame.push(this.userService.usersArray[i]);	
			};
		};
		console.log(this.userService.choiceUsersToGame);
	};

	public Game_501() {
		this.choice_501 = true;
		this.choice_301 = false;		
	};

	public Game_301() {
		this.choice_301 = true;
		this.choice_501 = false;
	};

	// Checking the selection of all players and the type of game 
	public checkStart() {
		if ((this.userService.choiceUsersToGame.length === 3) && (this.choice_501 === true)) {
			this.togglePage();
		}
		else alert("Выберите игру");
		console.log(this.userService.choiceUsersToGame, this.choice_501 === true);
	};

	public search(value) {
		if(value == ""){
			this.showErr = false;			
		};
		
		this.userService.usersArray.find(i => {
			if ((value) == i.name) {
				return this.findName = i;
			}
			else {
				return this.findName = undefined;
			};
		});		
	};
	
	public findUser(value) {		
		if(this.findName == undefined) {
			this.showErr = true;
		}	
		if(this.findName !== undefined){
			var i = undefined;
			var findUser = this.findName;
			findUser.active = true;	
			this.playerChoice(i, findUser);	
			this.showErr = false;
		};
	};

	//  cange color active User field
	public changeColor(i) {
		if(this.userService.usersArray[i].active == false) {
			this.userService.usersArray[i].active = true;
			console.log(this.userService.usersArray[i].active);
		}
		else this.userService.usersArray[i].active = false;
	};
};
