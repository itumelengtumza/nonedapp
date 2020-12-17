import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightInfoPage } from './weight-info.page';

describe('WeightInfoPage', () => {
  let component: WeightInfoPage;
  let fixture: ComponentFixture<WeightInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
