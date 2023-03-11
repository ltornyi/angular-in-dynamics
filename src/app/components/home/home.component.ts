import { Component } from '@angular/core';
import { MeService, UserInfo } from 'src/app/services/me.service';

type UserProfile = {

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  me: UserInfo;
  error: any;

  constructor(private meService: MeService) {}

  ngOnInit() {
    this.meService.getMe()
      .subscribe(data => this.me = {...data});
  }
}
