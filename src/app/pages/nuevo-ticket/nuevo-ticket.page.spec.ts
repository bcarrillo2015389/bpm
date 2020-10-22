import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoTicketPage } from './nuevo-ticket.page';

describe('NuevoTicketPage', () => {
  let component: NuevoTicketPage;
  let fixture: ComponentFixture<NuevoTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
