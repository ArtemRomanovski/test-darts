export class UserCard {

	constructor(
		public name: string,
		public email?: string,
		public active?: boolean
	) { };
};

export interface PointCard {

	currantPoint: number;
	totalPoint: number;
};