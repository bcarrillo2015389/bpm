import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-asignados',
  templateUrl: './tickets-asignados.page.html',
  styleUrls: ['./tickets-asignados.page.scss'],
})
export class TicketsAsignadosPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

}
