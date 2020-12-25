import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { RepoService } from 'src/app/services/repo.service';


@Component({
  selector: 'app-weight-info',
  templateUrl: './weight-info.page.html',
  styleUrls: ['./weight-info.page.scss'],
})
export class WeightInfoPage implements OnInit {
  postData = {
    start_weight: null,
    height: null,
    current_weight: null,
    from_weight_info: null
  };
  
  weight_info_str_arr = ['start_weight','height', 'current_weight']
  form = new FormGroup({
    start_weight: new FormControl('', [Validators.required, Validators.min(30), Validators.max(250)]),
    height: new FormControl('', [Validators.required, Validators.min(0.6), Validators.max(2)]),
    current_weight: new FormControl('', [Validators.required, Validators.min(30), Validators.max(250)]),
  });

  constructor(private router: Router, private offlineStorageService: OfflineStorageService, 
    private route: ActivatedRoute, private repo: RepoService) {}

  ngOnInit() {
    this.offlineStorageService.get(AuthConstants.INIT_WEIGHT_DATA).then((data) => {
      if (data) {
        this.postData.start_weight = data.start_weight;
        this.postData.height = data.height;
        this.postData.current_weight = data.current_weight;
        this.form.setValue({start_weight: data.start_weight, height: data.height, 
          current_weight: data.current_weight});
      } 
    });
  }

  get start_weight() { return this.form.get(this.weight_info_str_arr[0]); }
  get height() { return this.form.get(this.weight_info_str_arr[1]); }
  get current_weight() { return this.form.get(this.weight_info_str_arr[2]); }

  setVals() {
    this.postData.start_weight = this.start_weight.value;
    this.postData.height = this.height.value;
    this.postData.current_weight = this.current_weight.value;

    /*
    if (week_num == storage_week_num && current_weight != storage_current_weight) {
      storage_current_weight = current_weight
    } else if (week_num == storage_week_num && current_weight == storage_current_weight) {
        console.log('nothing to do');
    } else if (week_num != storage_week_num) {
      make a new object {x:week_num, y: current_weight} push it into the storage obj
    }
    */
    
    this.offlineStorageService.store(AuthConstants.INIT_WEIGHT_DATA, this.form.value);
    let current_weight_data = [];
    this.repo.homeData.subscribe(
      home_data => { 
        if (home_data) {
          //home_data.weeks_preg = 27;
          this.offlineStorageService.get(AuthConstants.CURRENT_WEIGHT_DATA).then((data) => {
            console.log(data);
            if (data) {
              if (data.length > 0 && home_data.weeks_preg == data[data.length-1].x && 
                this.current_weight.value != data[data.length-1].y) {
                  current_weight_data = data;
                  current_weight_data.pop();
                  current_weight_data.push({ x: home_data.weeks_preg, y: this.current_weight.value });
              } else if (data.length > 0 && home_data.weeks_preg == data[data.length-1] && 
                this.current_weight.value == data[data.length-1].y) {
                  console.log('nothing to do');
              } else if (data.length > 0 && home_data.weeks_preg != data[data.length-1].x) {
                current_weight_data = data;
                current_weight_data.push({x:home_data.weeks_preg, y: this.current_weight.value});
              } else {
                current_weight_data = data;
              }
              this.offlineStorageService.store(AuthConstants.CURRENT_WEIGHT_DATA, current_weight_data);
            }
            else {
              current_weight_data.push({ x: home_data.weeks_preg, y: this.current_weight.value });
              this.offlineStorageService.store(AuthConstants.CURRENT_WEIGHT_DATA, current_weight_data);
            }
          });
          
        }
      }
    );
    this.offlineStorageService.store('from_weight_info', true);
    this.router.navigate(['/tabs/tools/weight']);    
  }
}