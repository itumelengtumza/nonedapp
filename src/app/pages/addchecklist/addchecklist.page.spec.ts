import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddchecklistPage } from './addchecklist.page';

describe('AddchecklistPage', () => {
  let component: AddchecklistPage;
  let fixture: ComponentFixture<AddchecklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchecklistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddchecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
