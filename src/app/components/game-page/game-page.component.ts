import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { RegAppComponent } from '../Registration/reg-app.component';
import { UsersService } from '../services/users.service';

export interface userGame {
	name: string
	points: number
}

export interface pointArray {
	points: number
}

@Component({
	selector: 'app-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

	public countStep: number = 1;

	public countUser = [];

	public pointArray = []

	public arr = []

	public point_1: number;
	public point_2: number;
	public point_3: number;

	public valueX1: boolean = false;
	public valueX2: boolean = false;
	public valueX3: boolean = false;




	constructor(
		public userService: UsersService,
		private regComponent: RegAppComponent
	) {
		console.log(
			this.userService.usersGameArray)


			let xyz = this.ce("div", 123, "click", this.test);

			
			
		}


	ngOnInit(): void {
		this.startGameUser()
	}


	active() {
		console.log("click")
	}
	newGame() {
		// this.toggle = !this.toggle;
		this.regComponent.toggleGamePage = false
	}

	startGameUser() {
		this.userService.usersGameArray.forEach(i => this.userService.pointsArray.push({ name: i.name, points: 501 }));
		// this.userService.pointsArray.push(this.countStep);
		console.log(this.userService.pointsArray);
	}

	public addPoint_1(event: any) {
		// if (this.valueX1 !== true) {
		// 	this.point_1 = event.target.value
		// }
		this.point_1 = event.target.value

		console.log(this.point_1)
	}
	public addPoint_2(event: any) {
		// if (this.valueX2 !== true) {
		// 	this.point_2 = (event.target.value) * 2
		// }
		this.point_2 = event.target.value

		console.log(this.point_2)
	}
	public addPoint_3(event: any) {
		// if (this.valueX3 !== true) {
		// 	this.point_3 = (event.target.value) * 3
		// }
		this.point_3 = event.target.value

		console.log(this.point_3)
	}

	public active_x1() {
		this.valueX1 = true
		// this.point_1 = this.point_1 * 1
	}
	public active_x2() {
		this.valueX2 = true
		// this.point_1 = this.point_1 * 2
	}
	public active_x3() {
		this.valueX3 = true
		// this.point_1 = this.point_1 * 3
	}


	public addStep() {

		this.pointArray.push(this.point_1, this.point_2, this.point_3)
		this.valueX1, this.valueX2, this.valueX3 = false;
		this.countStep++
		this.userService.pointsArray.map((i, ind) => {
			for (let j = 0; j < this.pointArray.length; j++) {
				if (ind == j) {
					i.points = i.points - this.pointArray[j]

				}
			}
		})

		this.arr.push(this.userService.pointsArray)
		console.log(this.arr)

	}


	public ce(name="div",text=null, event=null, fn) {
        let elem = document.createElement(name);
            if(text!=null) elem.innerHTML=text;
            if(event!=null) elem.addEventListener(event,fn);

        return elem
    }

	test() {
		console.log("test")
	}

	







}


