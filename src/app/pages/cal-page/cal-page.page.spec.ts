import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalPagePage } from './cal-page.page';

describe('CalPagePage', () => {
  let component: CalPagePage;
  let fixture: ComponentFixture<CalPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
