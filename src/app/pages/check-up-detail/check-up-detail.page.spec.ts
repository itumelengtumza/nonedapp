import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckUpDetailPage } from './check-up-detail.page';

describe('CheckUpDetailPage', () => {
  let component: CheckUpDetailPage;
  let fixture: ComponentFixture<CheckUpDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckUpDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckUpDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
