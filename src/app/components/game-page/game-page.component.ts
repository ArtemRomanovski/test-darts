import { Component, OnInit } from '@angular/core';
import { RegAppComponent } from '../Registration/reg-app.component';
import { UsersService } from '../services/users.service';

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
	public countStep: number = 1;	// Count Step
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
	public titleStartInfo: string;	// starting info title
	public titleStepInfo: string;	// info title Step
	public usersRemaningPoints = [];
	public gameOver = {
		"victory_20_Steps": false,
		"victory_30_Steps": false,
		"draw_20": false,
		"draw_30": false,
		"additionalRounds": false
	};
	public impossobility = {
		"status": false,
		"user": "",
		"point": 0
	};
	public winnerUser: string;

	constructor(
		public userService: UsersService,
		private regComponent: RegAppComponent
	) { };

	ngOnInit(): void {
		this.startGameUser();
		// console.log(`--- Выбранные игроки ---`, this.userService.choiceUsersToGame);
	};

	public newGame() {
		this.regComponent.toggleGamePage = false;
		// reset table field values
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArray.length = 0);
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArrayCopy.length = 0);
		// reset `gameOver` value
		this.gameOver.victory_20_Steps = false;
		this.gameOver.victory_30_Steps = false;
		this.gameOver.draw_20 = false;
		this.gameOver.draw_30 = false;
	};

	public startGameUser() {
		// filling the starting field of the table with values
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArray.push({ name: i.name, points: 501 }));
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArrayCopy.push({ name: i.name, points: 501 }));
		this.titleStartInfo =
			`${this.userService.usersGameArrayCopy[0].name}: ${this.userService.usersGameArrayCopy[0].points} point(s)\n${this.userService.usersGameArrayCopy[1].name}: ${this.userService.usersGameArrayCopy[1].points} point(s)\n${this.userService.usersGameArrayCopy[2].name}: ${this.userService.usersGameArrayCopy[2].points} point(s)`;
	};

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
			};
		});		
	};

	// clearing values into Input
	public resetInput() {
		this.userDartValue.filter((i) => {
			this.userDartValue.filter((j, jdx) => {
				i[jdx].dart = undefined;
			});
		});
	};

	// Myltiplying the value and changing the color of the active button
	public currantHitPoints(inputValue, idxUser, idxDart, factor) {
		let result = inputValue*factor;
		if(inputValue !== undefined) {
			this.userDartValue[idxUser][idxDart].dart = result; 

			// double check to win
			if(factor !== 1){
				this.userDartValue[idxUser][idxDart].double = true;
				console.log(1111111);
				
			}
			if(factor == 1){
				this.userDartValue[idxUser][idxDart].double = false;
				console.log(222);
				
			}
			console.log(333);
			
			console.log(this.userDartValue[idxUser][idxDart].dart);
			console.log(`Очки - ${inputValue}`, `\nИгрок - ${idxUser}`,`\nИндекс(номер дротика) - ${idxDart}`, `\nМножитель - ${factor}`, `\nРезультат - ${result}`,`\n`,this.userDartValue[idxUser]);
		};
		if(factor == 1){
			this.userDartValue[idxUser][idxDart].active_1 = true;
			this.userDartValue[idxUser][idxDart].active_2 = false;
			this.userDartValue[idxUser][idxDart].active_3 = false;
		};
		if(factor == 2){
			this.userDartValue[idxUser][idxDart].active_1 = false;
			this.userDartValue[idxUser][idxDart].active_2 = true;
			this.userDartValue[idxUser][idxDart].active_3 = false;
		};
		if(factor == 3){
			this.userDartValue[idxUser][idxDart].active_1 = false;
			this.userDartValue[idxUser][idxDart].active_2 = false;
			this.userDartValue[idxUser][idxDart].active_3 = true;
		};			
	};

	// Reset color Btn and double value
	public ResetActiveBtn() {
		this.userDartValue.filter(i => {
			for(let j=0; j<3; j++) {
				i[j].active_1 = true;
				i[j].active_2 = false;
				i[j].active_3 = false;
				i[j].double = false;
			};
		});
	};

	// addition of points of three darts
	public sumPoits() {
		let sum;
		let dbl = false;
		this.currantPointsArray.forEach((i, idx) => {
			sum = 0;
			for(let j=0; j<3; j++) {
				sum += i[j].dart;	
				if(i[j].double == true){
					dbl = true;
				};
			};
			this.userService.currantTotalPointsArray[idx] = { "totalPoint": sum, "double": dbl };
		});
	};

	// Step
	public addStep() {
		this.push();
		this.sumPoits();
		this.addResultPointToPage();
		this.ResetActiveBtn();
		// title info
		this.titleStepInfo = `Currant hit points:\n${this.userService.usersGameArray[0].name}: ${(this.userService.currantTotalPointsArray[0].totalPoint)} (${this.currantPointsArray[0][0].dart}+${this.currantPointsArray[0][1].dart}+${this.currantPointsArray[0][2].dart})\n${this.userService.usersGameArray[1].name}: ${(this.userService.currantTotalPointsArray[1].totalPoint)} (${this.currantPointsArray[1][0].dart}+${this.currantPointsArray[1][1].dart}+${this.currantPointsArray[1][2].dart})\n${this.userService.usersGameArray[2].name}: ${(this.userService.currantTotalPointsArray[2].totalPoint)} (${this.currantPointsArray[2][0].dart}+${this.currantPointsArray[2][1].dart}+${this.currantPointsArray[2][2].dart})`;
		console.log(this.titleStepInfo);
	};

	// add line to result table
	public addResultPointToPage() {
		this.usersRemaningPoints.push([]);
		this.userService.usersGameArray.forEach((i, ind) => {
			let x = i.points-(this.userService.currantTotalPointsArray[ind].totalPoint);
			if (x > 1) {
				i.points = x;
			}
			else if (x == 0 && i.double == true) {
				i.points = x;
				this.gameOver.victory_20_Steps = true;
				this.winnerUser = this.userService.usersGameArray[ind].name;
				// showModal here
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
		if (this.countStep === 2) {
			this.userService.usersGameArray.forEach((i) => {
				if(temp == 1) {
					if(i.points == min) {
					this.gameOver.victory_20_Steps = true;
					this.winnerUser = i.name;
					};
				}
				else if(temp > 1) {
					this.gameOver.additionalRounds = true;
					setTimeout(() => {
						this.gameOver.additionalRounds = false;
					}, 3000);
				};
			});			
		};

		// Step 30
		if (this.countStep === 3) {
			// Условие победа или ничья
			this.userService.usersGameArray.forEach((i) => {
				if(temp == 1) {
					if(i.points == min) {
					this.gameOver.victory_30_Steps = true;
					this.winnerUser = i.name;
					};
				}
				else if(temp > 1) {						
					this.gameOver.draw_30 = true;
				};
			});
		};
		// Step
		this.countStep++
		this.resetInput();
	};
};



