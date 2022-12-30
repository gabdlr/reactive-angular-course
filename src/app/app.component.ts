import {Component, OnInit} from '@angular/core';
import { AuthStoreService } from './services/auth.store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  constructor(public authStoreService: AuthStoreService) {

  }

  ngOnInit() {


  }

  logout() {
    this.authStoreService.logout()
  }

}
