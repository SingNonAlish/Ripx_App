import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  password: string;
  cpassword: string;
  constructor(
    public afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
    public alert: AlertController,
    public user: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword } = this;
    if (password !== cpassword) {
      return console.error('Password don t match');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@e-tech.ac.th', password);

      this.afstore.doc(`user/${res.user.uid}`).set({
        username
      });

      this.user.setUser({
        username,
        uid: res.user.uid
      });

      this.showAlert('สำเร็จ', 'ผลการสมัครสมาชิก');
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.dir(error);
    }
  }

  // try {

  //   console.log(res);
  //   this.showAlert('Success!', 'Welcome aboard');
  //   this.router.navigate(['/tabs']);
  // } catch (error) {
  //   console.dir(error);
  //   this.showAlert('Error', error.message);
  // }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

}
