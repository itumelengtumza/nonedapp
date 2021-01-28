import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PregnancyByWeeksPage } from './pregnancy-by-weeks.page';

describe('PregnancyByWeeksPage', () => {
  let component: PregnancyByWeeksPage;
  let fixture: ComponentFixture<PregnancyByWeeksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnancyByWeeksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PregnancyByWeeksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
