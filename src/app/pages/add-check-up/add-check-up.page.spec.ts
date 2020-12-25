import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCheckUpPage } from './add-check-up.page';

describe('AddCheckUpPage', () => {
  let component: AddCheckUpPage;
  let fixture: ComponentFixture<AddCheckUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCheckUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
