import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrinkWaterPage } from './drink-water.page';

describe('DrinkWaterPage', () => {
  let component: DrinkWaterPage;
  let fixture: ComponentFixture<DrinkWaterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkWaterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinkWaterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
