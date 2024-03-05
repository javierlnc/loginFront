import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', Validators.required),
  });
  constructor(private modalService: NgbModal, private loginServies: LoginService) {
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }
  onSubmit() {
    if(this.loginForm.valid){
      
    }
  }
  get usuario() { return this.loginForm.controls.usuario; }
}
