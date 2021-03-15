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
	// Массив с попаданиями с трёх полей каждоко игрока
	public currantPointsArray = [
		[
			{"dart": 0},
			{"dart": 0},
			{"dart": 0},
		],	
		[
			{"dart": 0},
			{"dart": 0},
			{"dart": 0},
		],	
		[
			{"dart": 0},
			{"dart": 0},
			{"dart": 0},
		],	
	];
	// Временный массив для умножения
	public userDartValue = [
		[
			{"dart": undefined},
			{"dart": undefined},
			{"dart": undefined},
		],	
		[
			{"dart": undefined},
			{"dart": undefined},
			{"dart": undefined},
		],	
		[
			{"dart": undefined},
			{"dart": undefined},
			{"dart": undefined},
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
		console.log(`--- Выбранные игроки ---`, this.userService.choiceUsersToGame);
		console.log(this.currantPointsArray);
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
					i[t].dart = 0;
					console.log(i[t].dart);					
				}
				else i[t].dart = this.userDartValue[idx][t].dart;
			};
		});		
		console.log(this.currantPointsArray);
	};

	public resetInput() {
		this.userDartValue.filter((i) => {
			this.userDartValue.filter((j, jdx) => {
				i[jdx].dart = undefined;
			});
		});
	};

	public currantHitPoints(inputValue, idxUser, idxDart, factor) {
		let result = inputValue*factor;
		if(inputValue !== undefined) {
			this.userDartValue[idxUser][idxDart].dart = result; 
			console.log(this.userDartValue[idxUser][idxDart].dart);			 
			console.log(`Очки - ${inputValue}`, `\nИгрок - ${idxUser}`,`\nИндекс(номер дротика) - ${idxDart}`, `\nМножитель - ${factor}`, `\nРезультат - ${result}`,`\n`,this.userDartValue[idxUser]);
		};
	};

	// addition of points of three darts
	public sumPoits() {
		let sum;
		this.currantPointsArray.forEach((i, idx) => {
			sum = 0;
			for(let j=0; j<3; j++) {
				sum += i[j].dart;	
				console.log(sum);							
			};
			this.userService.currantTotalPointsArray[idx] = { totalPoint: sum };
			console.log(this.userService.currantTotalPointsArray[idx]);	
		});
	};

	// Step
	public addStep() {
		this.push();
		this.sumPoits();
		this.addResultPointToPage();
		// title info
		this.titleStepInfo = `Текущие очки попаданий:\n${this.userService.usersGameArray[0].name}: ${(this.userService.currantTotalPointsArray[0].totalPoint)} (${this.currantPointsArray[0][0].dart}+${this.currantPointsArray[0][1].dart}+${this.currantPointsArray[0][2].dart})\n${this.userService.usersGameArray[1].name}: ${(this.userService.currantTotalPointsArray[1].totalPoint)} (${this.currantPointsArray[1][0].dart}+${this.currantPointsArray[1][1].dart}+${this.currantPointsArray[1][2].dart})\n${this.userService.usersGameArray[2].name}: ${(this.userService.currantTotalPointsArray[2].totalPoint)} (${this.currantPointsArray[2][0].dart}+${this.currantPointsArray[2][1].dart}+${this.currantPointsArray[2][2].dart})`;
		console.log(this.titleStepInfo);
	};

	// add line to result table
	public addResultPointToPage() {
		this.usersRemaningPoints.push([]);
		console.log(this.userService.usersGameArray);
		console.log(this.userService.currantTotalPointsArray);
		this.userService.usersGameArray.forEach((i, ind) => {
			let x = i.points-(this.userService.currantTotalPointsArray[ind].totalPoint);
			console.log(x);
			if (x > 1) {
				i.points = x;
			}
			else if (x == 0) {
				i.points = x;
				// alert - Winner
				this.gameOver.victory_20_Steps = true;
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
			// Table liner
			this.usersRemaningPoints[this.countStep - 1].push(
				{ point: i.points, step: this.countStep }
			);	
		});
		// Step - 20
		if (this.countStep === 20) {
			this.userService.usersGameArray.forEach((i) => {
				var min = this.userService.usersGameArray[0].points;
				if (i.points < min) {
					min = i.points;
					this.gameOver.victory_20_Steps = true;
					this.winnerUser = i.name;
				};
				if (i.points == min) {
					// alert - Draw! Additional 10 Rounds!
					this.gameOver.additionalRounds = true;
					setTimeout(() => {
						this.gameOver.additionalRounds = false;
					}, 3000);
				};
				// showModal here
			});
		};
		// Step 30
		if (this.countStep === 30) {
			this.userService.usersGameArray.forEach((i) => {
				var min = this.userService.usersGameArray[0].points;
				if (i.points < min) {
					min = i.points;
					// alert - Winner
					this.gameOver.victory_30_Steps = true;
					this.winnerUser = i.name;
				}
				else if (i.points == min) {
					// alert - Draw
					this.gameOver.draw_30 === true;
				};
			});
			// showModal here
		};
		// Step
		this.countStep++
		this.resetInput();
	};

	// modal 
	public showModal() {
		
	};
};



