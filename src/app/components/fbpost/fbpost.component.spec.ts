import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FbpostComponent } from './fbpost.component';

describe('FbpostComponent', () => {
  let component: FbpostComponent;
  let fixture: ComponentFixture<FbpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbpostComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FbpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
