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
  loginError: string = '';
  showModal = false;
  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', Validators.required),
  });
  constructor(private modalService: NgbModal, private router: Router, private loginService: LoginService) {
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (UserData) => {
          console.log(UserData);

        },
        error: (err) => {
          this.showModal = true;
          console.error("ha ocurrido un error: " + err);
          this.loginError = err;

          console.log(this.loginError);
          console.log(this.showModal)
          this.loginForm.reset();
          this.loginForm.markAllAsTouched();
        },
        complete: () => {
          console.log("listo");
          this.loginForm.reset();
          this.router.navigateByUrl('/home');
        },
      });

    }
  }

  get usuario() { return this.loginForm.controls.usuario; }
  get contraseña() { return this.loginForm.controls.contraseña; }
}
