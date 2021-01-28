import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTasksPage } from './add-tasks.page';

describe('AddTasksPage', () => {
  let component: AddTasksPage;
  let fixture: ComponentFixture<AddTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
