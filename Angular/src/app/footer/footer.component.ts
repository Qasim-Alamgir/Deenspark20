import { Component, OnInit } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  MDBBootstrapModule = MDBBootstrapModule;
  constructor() { }

  ngOnInit(): void {
  }

}
