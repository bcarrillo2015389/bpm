import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TramiteTicketPage } from './tramite-ticket.page';

describe('TramiteTicketPage', () => {
  let component: TramiteTicketPage;
  let fixture: ComponentFixture<TramiteTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramiteTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TramiteTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
