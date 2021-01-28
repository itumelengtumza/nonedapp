import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RepoService implements OnInit {

  home_data = {
    baby_fruit_size: null,
    weeks_preg: null,
    days_left: null
  }

  private home_data_BS = new BehaviorSubject(null);

  homeData = this.home_data_BS.asObservable();

  setHomeData(message: object) {
    this.home_data_BS.next(message)
  }
  
  private babyFruitSizes = ["---", "---", "---",
  "Poppy Seed", "Apple Seed", "Sweet Pea", "Blueberry", "Raspberry", "Green Olive", "Prune", "Lime", "Plum",
  "Peach", "Lemon", "Navel Orange", "Avocado", "Onion", "Sweet Potato", "Mango", "Banana", "Pomegranate",
  "Papaya", "Grapefruit", "Cantaloupe", "Cauliflower", "Lettuce", "Rutabaga", "Eggplant", "Acorn Squash",
  "Cucumber", "Pineapple", "Squash", "Durian", "Butternut Squash", "Coconut", "Honeydew", "Winter Melon",
  "Pumpkin", "Watermelon", "Jackfruit"
];

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.userData$.subscribe((res:any) => {
      if(res.dueDate !== undefined) {
        let date_now = Date.now();
        let given_birth_date = Date.parse(res.dueDate);
        let diff_in_time = given_birth_date - date_now;
        let days_left = Math.floor(diff_in_time / (1000 * 3600 * 24));
        let weeks_left = Math.floor(days_left / 7);
        let weeks_preg = 40 - weeks_left;
        let baby_fruit_size = this.babyFruitSizes[weeks_preg - 1];
        this.home_data.days_left = days_left;
        this.home_data.weeks_preg = weeks_preg;
        this.home_data.baby_fruit_size = baby_fruit_size;
        this.setHomeData(this.home_data);
      } 
    });
  }

  
}
