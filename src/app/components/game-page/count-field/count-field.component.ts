import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-count-field',
  templateUrl: './count-field.component.html',
  styleUrls: ['./count-field.component.scss']
})
export class CountFieldComponent implements OnInit {

	@Input() usersArray

  constructor(public _userService: UsersService) { }

  ngOnInit(): void {
  }

  active() {
	console.log("click")
}

}
