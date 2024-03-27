import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor(private modalService: NgbModal, private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
