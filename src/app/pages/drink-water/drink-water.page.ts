import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drink-water',
  templateUrl: './drink-water.page.html',
  styleUrls: ['./drink-water.page.scss'],
})
export class DrinkWaterPage implements OnInit {

  drink_target: number = 2000;
  progress: number = 0.1;
  constructor() { }

  ngOnInit() {
  }

}
