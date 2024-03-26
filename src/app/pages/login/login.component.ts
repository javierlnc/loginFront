import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

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
  constructor(private modalService: NgbModal, private router:Router, private loginServies: LoginService) {
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }
  onSubmit() {
    if(this.loginForm.valid){
      this.loginServies.login(this.loginForm.value as LoginRequest).subscribe({
        next:(UserData) => {
          console.log(UserData);
          
        },
        error:(err) => {
          console.error("ha ocurrido un error: " + err);
          this.loginForm.reset();
        },
        complete:() => {
          console.log("listo");
          this.loginForm.reset();
          this.router.navigateByUrl('/home');
        },
      });
     

    }else{
      this.loginForm.markAllAsTouched();

    }
  }
  get usuario() { return this.loginForm.controls.usuario; }
}
