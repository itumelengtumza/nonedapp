import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';


@Component({
  selector: 'app-weight-info',
  templateUrl: './weight-info.page.html',
  styleUrls: ['./weight-info.page.scss'],
})
export class WeightInfoPage implements OnInit {
  postData = {
    start_weight: null,
    height: null,
    current_weight: null
  };
  
  weight_info_str_arr = ['start_weight','height', 'current_weight']
  form = new FormGroup({
    start_weight: new FormControl('', [Validators.required, Validators.min(30), Validators.max(250)]),
    height: new FormControl('', [Validators.required, Validators.min(0.6), Validators.max(2)]),
    current_weight: new FormControl('', [Validators.required, Validators.min(30), Validators.max(250)]),
  });

  constructor(private router: Router, private offlineStorageService: OfflineStorageService, 
    private route: ActivatedRoute) {
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

  ngOnInit() {}

  get start_weight() { return this.form.get(this.weight_info_str_arr[0]); }
  get height() { return this.form.get(this.weight_info_str_arr[1]); }
  get current_weight() { return this.form.get(this.weight_info_str_arr[2]); }

  setVals() {
    this.postData.start_weight = this.start_weight.value;
    this.postData.height = this.height.value;
    this.postData.current_weight = this.current_weight.value;
    this.offlineStorageService.store(AuthConstants.INIT_WEIGHT_DATA, this.postData);
    this.router.navigate(['/tabs/tools/weight']);    
  }
}