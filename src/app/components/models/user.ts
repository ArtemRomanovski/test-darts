export class UserCard {

	constructor(
		public name: string,
		public email?: string
	) { }
}

export interface PointCard {

	currantPoint: number
	totalPoint: number

}