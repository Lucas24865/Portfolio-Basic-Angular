import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  permission:any = PortfolioService.permission;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private data: PortfolioService) {    
    this.form = this.formBuilder.group(
      {
        user: ['', [Validators.required]],
        pass: ['', [Validators.required]]
      }
    )
  }
  get User() {
    return this.form.get('user');
  }

  get Password() {
    return this.form.get('password');
  }
  onSend(event: Event) {
    event.preventDefault;
    Swal.fire({
      title: 'Cargando!',
      icon: 'info',
      text: 'Por favor espere.',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    this.authenticationService.Login(this.form.value).subscribe({
      next: (data) => { console.log(JSON.stringify(data));Success();},
      error: (err) => CredentialError()
    });
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  logout(){
    LogOut();
    this.authenticationService.Logout();
  }
}

function CredentialError(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Credenciales invalidas!'
  })
}
function LogOut(){
  Swal.fire({
    icon: 'success',
    title: 'La sesión fue cerrada exitosamente.',
  })
}
function Success(){
  Swal.fire(
    'Exitoso!',
     'Se inició sesión correctamente',
     'success')
}