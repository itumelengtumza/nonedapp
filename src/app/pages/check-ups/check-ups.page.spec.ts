import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckUpsPage } from './check-ups.page';

describe('CheckUpsPage', () => {
  let component: CheckUpsPage;
  let fixture: ComponentFixture<CheckUpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckUpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckUpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
