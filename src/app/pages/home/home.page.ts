import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public authUser: any;
  public progress = 0.5;
  days_pregnant: number;
  weeks_left: number;
  baby_fruit_size: string;
  babyFruitSizes = ["---", "---", "---",
  "Poppy Seed", "Apple Seed", "Sweet Pea", "Blueberry", "Raspberry", "Green Olive", "Prune", "Lime", "Plum",
  "Peach", "Lemon", "Navel Orange", "Avocado", "Onion", "Sweet Potato", "Mango", "Banana", "Pomegranate",
  "Papaya", "Grapefruit", "Cantaloupe", "Cauliflower", "Lettuce", "Rutabaga", "Eggplant", "Acorn Squash",
  "Cucumber", "Pineapple", "Squash", "Durian", "Butternut Squash", "Coconut", "Honeydew", "Winter Melon",
  "Pumpkin", "Watermelon", "Jackfruit"
];

  constructor(private auth: AuthService) { 
  }

  ngOnInit() {
    /** check the incoming values from the remote database are within the expected values 
     * (in case database was hacked) */
    this.auth.userData$.subscribe((res:any) => {
      if(res.dueDate !== undefined) {
        console.log(res);
        this.authUser = res;
        let date_now = Date.now();
        let give_birth_date = Date.parse(this.authUser.dueDate);
        let diff_in_time = give_birth_date - date_now;
        this.days_pregnant = Math.floor(diff_in_time / (1000 * 3600 * 24));
        let weeks_pregnant = Math.floor(this.days_pregnant / 7);
        this.weeks_left = 40 - weeks_pregnant;
        this.baby_fruit_size = this.babyFruitSizes[this.weeks_left - 1]; // arrays starts at 0 position
      } 
    });
  }

  public increaseProgress(){
    this.progress = this.progress + 0.1; 
  }

}
