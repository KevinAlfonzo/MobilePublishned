import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup<any>({});

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastController: ToastController,
              private authService: AuthService,
              private alertController: AlertController) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      dni: [''],
      contraseña: [''],
    })
  }

  login(){
    const login: LoginDto = {
      dni: this.loginForm.controls['dni'].value,
      contraseña: this.loginForm.controls['contraseña'].value
    }
    this.authService.auth(login).subscribe(res => {
      if(res && res.length > 0) {
        const user = res[0];
        console.log('Usuario existente: ', res);
        switch (user.rol) {
          case 'A':
            this.authService.setSession(user);
            this.router.navigate(['empleados']);
            console.log('Usuario :', this.authService.getSession())
            break;
          case 'V':
            this.router.navigate(['venta']);
            break;
          case 'C':
            this.router.navigate(['servicios']);
            break;
          default:
            this.showMessage('El estado de tu cuenta es desconocido, comunicate con el administrador');
            break;  
        }
      } else {
        console.log('No tienes acceso');
        this.presentAlert();
      }
    })
  }

  async showMessage (message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Mensaje Importante',
      message: '¡El DNI y/o contraseña es incorrecto!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  newUser() {
    this.router.navigate(['user-save']).then();
  }

  regresar() {
    this.router.navigate(['inicio']).then();
  }

}
