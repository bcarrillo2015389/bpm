import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsAsignadosPage } from './tickets-asignados.page';

describe('TicketsAsignadosPage', () => {
  let component: TicketsAsignadosPage;
  let fixture: ComponentFixture<TicketsAsignadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsAsignadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsAsignadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
