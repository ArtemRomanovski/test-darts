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

	// Count Step
	public countStep: number = 1;

	// Массив с попаданиями с трёх полей каждоко игрока
	public currantPointsArray = [
		[
			{ dart: 0 },
			{ dart: 0 },
			{ dart: 0 },
		],
		[
			{ dart: 0 },
			{ dart: 0 },
			{ dart: 0 },
		],
		[
			{ dart: 0 },
			{ dart: 0 },
			{ dart: 0 },
		]
	];

	public _User1_dart_1: number = 0;
	public _User1_dart_2: number = 0;
	public _User1_dart_3: number = 0;

	public _User2_dart_1: number = 0;
	public _User2_dart_2: number = 0;
	public _User2_dart_3: number = 0;

	public _User3_dart_1: number = 0;
	public _User3_dart_2: number = 0;
	public _User3_dart_3: number = 0;

	// starting info title
	public titleStartInfo: string;

	// info title Step
	public titleStepInfo: string;


	constructor(
		public userService: UsersService,
		private regComponent: RegAppComponent
	) { };

	ngOnInit(): void {

		this.startGameUser();

		console.log(`--- Выбранные игроки ---`, this.userService.choiceUsersToGame);
		console.log(this.currantPointsArray);
	}

	public newGame() {

		this.regComponent.toggleGamePage = false;
		// reset table field values
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArray.length = 0);
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArrayCopy.length = 0);
	};

	public startGameUser() {

		// filling the starting field of the table with values
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArray.push({ name: i.name, points: 501 }));
		this.userService.choiceUsersToGame.forEach(i => this.userService.usersGameArrayCopy.push({ name: i.name, points: 501 }));

		this.titleStartInfo =
			`${this.userService.usersGameArrayCopy[0].name}: ${this.userService.usersGameArrayCopy[0].points} point(s)\n${this.userService.usersGameArrayCopy[1].name}: ${this.userService.usersGameArrayCopy[1].points} point(s)\n${this.userService.usersGameArrayCopy[2].name}: ${this.userService.usersGameArrayCopy[2].points} point(s)`;
	}

	public push() {

		this.currantPointsArray[0][0].dart = this._User1_dart_1;
		this.currantPointsArray[0][1].dart = this._User1_dart_2;
		this.currantPointsArray[0][2].dart = this._User1_dart_3;

		this.currantPointsArray[1][0].dart = this._User2_dart_1;
		this.currantPointsArray[1][1].dart = this._User2_dart_2;
		this.currantPointsArray[1][2].dart = this._User2_dart_3;

		this.currantPointsArray[2][0].dart = this._User3_dart_1;
		this.currantPointsArray[2][1].dart = this._User3_dart_2;
		this.currantPointsArray[2][2].dart = this._User3_dart_3;
	}

	public resetInput() {

		this._User1_dart_1 = 0;
		this._User1_dart_2 = 0;
		this._User1_dart_3 = 0;

		this._User2_dart_1 = 0;
		this._User2_dart_2 = 0;
		this._User2_dart_3 = 0;

		this._User3_dart_1 = 0;
		this._User3_dart_2 = 0;
		this._User3_dart_3 = 0;
	}

	// 1 Gamer - 1 Dart (value multiplication)
	public _User_1_addDart_1x1(value) {
		this._User1_dart_1 = value;
	};

	public _User_1_addDart_1x2(value) {
		this._User1_dart_1 = value * 2;
	};

	public _User_1_addDart_1x3(value) {
		this._User1_dart_1 = value * 3;
	};

	// 1 Gamer - 2 Dart (value multiplication)
	public _User_1_addDart_2x1(value) {
		this._User1_dart_2 = value;
	};

	public _User_1_addDart_2x2(value) {
		this._User1_dart_2 = value * 2;
	};

	public _User_1_addDart_2x3(value) {
		this._User1_dart_2 = value * 3;
	};

	// 1 Gamer - 3 Dart (value multiplication)
	public _User_1_addDart_3x1(value) {
		this._User1_dart_3 = value;
	};

	public _User_1_addDart_3x2(value) {
		this._User1_dart_3 = value * 2;
	};

	public _User_1_addDart_3x3(value) {
		this._User1_dart_3 = value * 3;
	};

	// 2 Gamer - 1 Dart (value multiplication)
	public _User_2_addDart_1x1(value) {
		this._User2_dart_1 = value;
	};

	public _User_2_addDart_1x2(value) {
		this._User2_dart_1 = value * 2;
	};

	public _User_2_addDart_1x3(value) {
		this._User2_dart_1 = value * 3;
	};

	// 2 Gamer - 2 Dart (value multiplication)
	public _User_2_addDart_2x1(value) {
		this._User2_dart_2 = value;
	};

	public _User_2_addDart_2x2(value) {
		this._User2_dart_2 = value * 2;
	};

	public _User_2_addDart_2x3(value) {
		this._User2_dart_2 = value * 3;
	};

	// 2 Gamer - 3 Dart (value multiplication)
	public _User_2_addDart_3x1(value) {
		this._User2_dart_3 = value;
	};

	public _User_2_addDart_3x2(value) {
		this._User2_dart_3 = value * 2;
	};

	public _User_2_addDart_3x3(value) {
		this._User2_dart_3 = value * 3;
	};

	// 3 Gamer - 1 Dart (value multiplication)
	public _User_3_addDart_1x1(value) {
		this._User3_dart_1 = value;
	};

	public _User_3_addDart_1x2(value) {
		this._User3_dart_1 = value * 2;
	};

	public _User_3_addDart_1x3(value) {
		this._User3_dart_1 = value * 3;
	};

	// 3 Gamer - 2 Dart (value multiplication)
	public _User_3_addDart_2x1(value) {
		this._User3_dart_2 = value;
	};

	public _User_3_addDart_2x2(value) {
		this._User3_dart_2 = value * 2;
	};

	public _User_3_addDart_2x3(value) {
		this._User3_dart_2 = value * 3;
	};

	// 3 Gamer - 3 Dart (value multiplication)
	public _User_3_addDart_3x1(value) {
		this._User3_dart_3 = value;
	};

	public _User_3_addDart_3x2(value) {
		this._User3_dart_3 = value * 2;
	};

	public _User_3_addDart_3x3(value) {
		this._User3_dart_3 = value * 3;
	};

	// addition of points of three darts
	public sumPoits() {

		for (let i = 0; i < this.currantPointsArray.length; i++) {
			let sum = 0;

			for (let j = 0; j < this.currantPointsArray[i].length; j++) {
				sum += +this.currantPointsArray[i][j].dart;
			};

			this.userService.currantTotalPointsArray[i] = { totalPoint: sum };
		};
	};

	// Step
	public addStep() {

		this.push();
		this.sumPoits();
		this.addResultPointToPage();

		// title info
		this.titleStepInfo = `Текущие очки попаданий:\n${this.userService.usersGameArray[0].name}: ${(this.userService.currantTotalPointsArray[0].totalPoint)} (${this.currantPointsArray[0][0].dart}+${this.currantPointsArray[0][1].dart}+${this.currantPointsArray[0][2].dart})\n${this.userService.usersGameArray[1].name}: ${(this.userService.currantTotalPointsArray[1].totalPoint)} (${this.currantPointsArray[1][0].dart}+${this.currantPointsArray[1][1].dart}+${this.currantPointsArray[1][2].dart})\n${this.userService.usersGameArray[2].name}: ${(this.userService.currantTotalPointsArray[2].totalPoint)} (${this.currantPointsArray[2][0].dart}+${this.currantPointsArray[2][1].dart}+${this.currantPointsArray[2][2].dart})`;
	};

	public usersRemaningPoints = [];

	// add line to result table
	public addResultPointToPage() {

		this.usersRemaningPoints.push([]);
		this.userService.usersGameArray.forEach((i, ind) => {
			for (let j = 0; j < this.userService.usersGameArray.length; j++) {
				if (ind == j) {
					let x = i.points - (this.userService.currantTotalPointsArray[j].totalPoint);

					if (x > 1) {
						i.points = x;
					}
					else if (x == 0) {
						i.points = x;
						alert(`${this.userService.usersGameArray[j].name} Winner!`);
						break;
					}
					else alert(`${this.userService.usersGameArray[j].name} набрал(а): ${this.userService.currantTotalPointsArray[j].totalPoint} очков - не сможет выйти по удвоению.`);

					this.usersRemaningPoints[this.countStep - 1].push(
						{ point: i.points, step: this.countStep }
					);
				};
			};
		});

		// Step - 20
		if (this.countStep === 20) {

			this.userService.usersGameArray.forEach((i) => {
				var min = this.userService.usersGameArray[0].points;
				if (i.points < min) {
					min = i.points;
					alert(`Winner - ${i.name}`);
				};
				if (i.points == min) {
					alert(`Ничья! Дополнительные 10 раундов!`);
				};
			});
		};

		// Step 30
		if (this.countStep === 30) {

			this.userService.usersGameArray.forEach((i) => {

				var min = this.userService.usersGameArray[0].points;

				if (i.points < min) {
					min = i.points;
					alert(`Winner - ${i.name}!`);
				};

				if (i.points == min) {
					alert(`Игра окончена в ничью!`);
				};
			});
		};

		// Step
		this.countStep++
		this.resetInput();
	};
};


