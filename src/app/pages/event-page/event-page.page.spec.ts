import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventPagePage } from './event-page.page';

describe('EventPagePage', () => {
  let component: EventPagePage;
  let fixture: ComponentFixture<EventPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
