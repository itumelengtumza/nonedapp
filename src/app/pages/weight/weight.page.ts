import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AuthConstants } from 'src/app/config/auth-constants';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.page.html',
  styleUrls: ['./weight.page.scss'],
})
export class WeightPage {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  // before chart plot
  start_weight = null;
  current_weight = null;
  height = null;
  exp_final_weight = null;
  gained = null;
  max=100;
  current=null;
  // for chart plot
  your_plot_data = [];
  lower_gain_arr = [];
  higher_gain_arr = [];
  your_data = 'your_plot_data';

  constructor(private router: Router, private repo: RepoService, private offlineStorageService: OfflineStorageService) { 
    this.offlineStorageService.get(AuthConstants.INIT_WEIGHT_DATA).then((data) => {
      if (data) {
        this.start_weight = data.start_weight;
        this.height = data.height;
        this.current_weight = data.current_weight;
        this.repo.homeData.subscribe(
          data => { 
            if (data) {
              let current_data = { x: data.weeks_preg, y: this.current_weight };
              this.offlineStorageService.get(this.your_data).then((data) => {
                if (data) {
                  console.log(data);
                  this.your_plot_data = data;
                  this.your_plot_data.push(current_data);
                  this.offlineStorageService.store(this.your_data, this.your_plot_data);
                } else {
                  console.log('No value as yet!');
                  this.your_plot_data.push(current_data);
                  this.offlineStorageService.store(this.your_data, this.your_plot_data);
                }
                this.lineChartMethod();
              });
            }
          }
        );
      } 
    });
    
    //this.offlineStorageService.removeStorageItem(this.your_data);
    /*
    xD.push(22);
    xD.sort((a,b)=>a-b);
    console.log(xD);
    */
  }

  calcBmi (weight, height) {
    // calculated in kg/(m*m)
    let bmi = (weight / (height * height));
    // gain for 1st trimeester is the same for underweight, normal and overweight, but different for obese
    this.lower_gain_arr = [weight, weight + 0.99]; 
    this.higher_gain_arr = [weight, weight + 2.97];
    // units in kg
    if (bmi < 18.5) {
      // underweight
      this.lower_gain_arr.push(weight + 12.60);
      this.higher_gain_arr.push(weight + 18.00);
    }
    else if (bmi <= 24.9 && bmi >= 18.5) {
      // normal weight
      this.lower_gain_arr.push(weight + 11.25);
      this.higher_gain_arr.push(weight + 15.75);
    }
    else if (bmi <= 29.9 && bmi >= 25.0) {
      // overweight
      this.lower_gain_arr.push(weight + 6.75);
      this.higher_gain_arr.push(weight + 11.25);
    }
    else {
      // obese
      this.lower_gain_arr = [weight, weight + 0.50, weight + 5.00];
      this.higher_gain_arr = [weight, weight + 1.98, weight + 9.00];
    }
    let lower_last_el = this.lower_gain_arr[this.lower_gain_arr.length-1];
    this.exp_final_weight = ( (this.higher_gain_arr[this.higher_gain_arr.length-1] - 
      lower_last_el) / 2 ) + lower_last_el;
    this.gained = this.current_weight - this.start_weight;
    this.current = ( this.gained / (this.exp_final_weight - weight) ) * 100;
  }

  lineChartMethod() {
    const colors = {
      noed: {
        fill: '#cb6fac',
        stroke: '#cb6fac',
      },
      purple: {
        stroke: '#75539e',
      },
      danger: {
        stroke: '#6b0d0d',
      },
      okay: {
        fill: "#17e40f",
        stroke: '#17e40f',
      },
    };
    
    this.calcBmi(this.start_weight,this.height);
    
    new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      
    data: {
        datasets: [
          {
            label: 'You',
            fill:false,
            showLine:false,
            pointBackgroundColor: colors.danger.stroke,
            borderColor: colors.danger.stroke,
            pointHighlightStroke: colors.danger.stroke,
            borderCapStyle: 'butt',
            data: this.your_plot_data,
        },
        {
            label: 'Exp Weight Gain Region',
            lineTension: 0,
            fill:false,
            pointBackgroundColor: colors.noed.stroke,
            borderColor: colors.noed.stroke,
            pointHighlightStroke: colors.noed.stroke,
            borderCapStyle: 'butt',
            pointRadius:0,
            data: [{
                x: 0,
                y: this.higher_gain_arr[0]
            }, {
                x: 13,
                y: this.higher_gain_arr[1]
            }, {
                x: 40,
                y: this.higher_gain_arr[2]
            }
          ],
        },
        {
          label:0,
          lineTension: 0,
          fill: '-1',
          backgroundColor: colors.noed.fill,
          pointBackgroundColor: colors.noed.stroke,
          borderColor: colors.noed.stroke,
          pointHighlightStroke: colors.noed.stroke,
          borderCapStyle: 'butt',
          pointRadius:0,
          data: [
          {
            x: 0,
            y: this.lower_gain_arr[0]
        }, {
            x: 13,
            y: this.lower_gain_arr[1]
        }, {
            x: 40,
            y: this.lower_gain_arr[2]
        }],
      },
      
      ]
    },
    options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'expected gain (kg)'
            }
          }],
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                  stepSize: 2
                },
                scaleLabel: {
                  display: true,
                  labelString: 'pregnant period (weeks)'
                }
            },
          ]
        },
      legend: {
        display: true,
        labels: {
           filter: label => {
              if (label.text !== 0) {
               return true;
            }
           },
           boxWidth:16
            //fontColor: 'rgb(255, 99, 132)',
            //usePointStyle:true
        }
      },
      animation: {
        duration: 750,
      },
    }
});
  }
}