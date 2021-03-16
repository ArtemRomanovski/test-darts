import { Component, OnInit } from '@angular/core';
import { from } from "rxjs";
import { RegAppComponent } from '../Registration/reg-app.component';
import { UsersService } from '../services/users.service';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

export interface userGame {
	name: string
	points: number
};

export interface pointArray {
	points: number
};

@Component({
	selector: 'app-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
	public buttonActive_x1: boolean = false;
	public buttonActive_x2: boolean = false;
	public buttonActive_x3: boolean = false;
	public infoIcon = faInfoCircle;
	public countStep: number = 1;	// Count Step
	public titleStartInfo: string;	// starting info title
	public titleStepInfo: string;	// info title Step
	public usersRemaningPoints = [];
	public winnerUser: string;
	public impossobility = {
		"status": false,
		"user": "",
		"point": 0
	};

	constructor(
		public userService: UsersService,
		private regComponent: RegAppComponent
	) { };

	ngOnInit(): void {
		this.startGameUser();
	};

	public newGame() {
		this.regComponent.toggleGamePage = false;
		// reset table field values
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArray.length = 0);
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArrayCopy.length = 0);
		this.userService.resetGameOver();
	};

	public startGameUser() {
		// filling the starting field of the table with values
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArray.push({ name: i.name, points: 501 }));
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArrayCopy.push({ name: i.name, points: 501 }));
		this.titleStartInfo =
			`${this.userService.usersGameArrayCopy[0].name}: ${this.userService.usersGameArrayCopy[0].points} point(s)\n${this.userService.usersGameArrayCopy[1].name}: ${this.userService.usersGameArrayCopy[1].points} point(s)\n${this.userService.usersGameArrayCopy[2].name}: ${this.userService.usersGameArrayCopy[2].points} point(s)`;
	};

	// clearing values into Input
	public resetInput() {
		this.userService.userDartValue.filter((i) => {
			this.userService.userDartValue.filter((j, jdx) => {
				i[jdx].dart = undefined;
			});
		});
	};

	// Myltiplying the value and changing the color of the active button
	public currantHitPoints(inputValue, idxUser, idxDart, factor) {
		this.userService.currantHitPointsFn(inputValue, idxUser, idxDart, factor)
	};

	// Step
	public addStep() {
		this.userService.push();
		this.userService.sumPoits();
		this.userService.ResetActiveBtn();
		this.addResultPointToPage();
		// title info
		this.titleStepInfo = `Currant hit points:\n${this.userService.usersGameArray[0].name}: ${(this.userService.currantTotalPointsArray[0].totalPoint)} (${this.userService.currantPointsArray[0][0].dart}+${this.userService.currantPointsArray[0][1].dart}+${this.userService.currantPointsArray[0][2].dart})\n${this.userService.usersGameArray[1].name}: ${(this.userService.currantTotalPointsArray[1].totalPoint)} (${this.userService.currantPointsArray[1][0].dart}+${this.userService.currantPointsArray[1][1].dart}+${this.userService.currantPointsArray[1][2].dart})\n${this.userService.usersGameArray[2].name}: ${(this.userService.currantTotalPointsArray[2].totalPoint)} (${this.userService.currantPointsArray[2][0].dart}+${this.userService.currantPointsArray[2][1].dart}+${this.userService.currantPointsArray[2][2].dart})`;
		console.log(this.titleStepInfo);
	};

	// add line to result table
	public addResultPointToPage() {
		this.usersRemaningPoints.push([]);
		this.userService.usersGameArray.forEach((i, ind) => {
			let x = i.points-(this.userService.currantTotalPointsArray[ind].totalPoint);
			let y = this.userService.currantTotalPointsArray[ind].double;			
			if (x > 1) {
				i.points = x;
			}
			else if (x == 0 && y == true) {
				i.points = x;
				this.userService.gameOver.victory_20_Steps = true;
				this.winnerUser = this.userService.usersGameArray[ind].name;
			}
			// alert - cannot win by doubling
			else {
				this.impossobility.status = true;
				this.impossobility.user = this.userService.usersGameArray[ind].name;
				this.impossobility.point = this.userService.currantTotalPointsArray[ind].totalPoint;
				setTimeout(() => {
					this.impossobility.status = false;
					this.impossobility.user = "";
					this.impossobility.point = 0;	
				}, 5000);
			};
			// add to Table liner
			this.usersRemaningPoints[this.countStep - 1].push(
				{ point: i.points, step: this.countStep }
			);	
		});

		// for check
		// console.log(
		// 	`\ncurrantPointsArrayn----------------`,this.currantPointsArray,
		// 	`\ncurrantTotalPointsArray------------`,this.userService.currantTotalPointsArray,
		// 	`\nuserGameArray----------------------`,this.userService.usersGameArray
		// 	);

		let min:number = this.userService.usersGameArray[0].points;
		this.userService.usersGameArray.forEach((i) => {
			if(min > i.points) {
				min = i.points;
			};
		});
		let temp:number = 0;
		this.userService.usersGameArray.forEach((i) => {
			if(i.points == min){
				temp++;
			};
		});

		// Step - 20
		if (this.countStep === 20) {
			this.userService.usersGameArray.forEach((i) => {
				if(temp == 1) {
					if(i.points == min) {
					this.userService.gameOver.victory_20_Steps = true;
					this.winnerUser = i.name;
					};
				}
				else if(temp > 1) {
					this.userService.gameOver.additionalRounds = true;
					setTimeout(() => {
						this.userService.gameOver.additionalRounds = false;
					}, 3000);
				};
			});			
		};

		// Step 30
		if (this.countStep === 30) {
			this.userService.usersGameArray.forEach((i) => {
				if(temp == 1) {
					if(i.points == min) {
					this.userService.gameOver.victory_30_Steps = true;
					this.winnerUser = i.name;
					};
				}
				else if(temp > 1) {						
					this.userService.gameOver.draw_30 = true;
				};
			});
		};
		// Step
		this.countStep++
		this.resetInput();
	};
};



