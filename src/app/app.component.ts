import {  Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { APIResponse, Customer } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected "styleUrl" to "styleUrls"
})
export class AppComponent  {

  title = 'TRAIN_BOOKING_APP_ANGULAR';
  registerObj: Customer = new Customer();
  trainService = inject(TrainService);
  loggedUser: Customer = new Customer();
  loginObj:any={
    "phone": "",
    "password": ""
  };

  // Inject PLATFORM_ID to check if the environment is browser
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only access localStorage if the platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      const localData = localStorage.getItem('trainApp');
      if (localData != null) {
        this.loggedUser = JSON.parse(localData);
      }
    }
  }

  // to clear the localData
  onLogOff() {
    this.loggedUser = new Customer();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('trainApp');
    }
     // Reload the page after successful login
     window.location.reload();  // This will reload the entire page
  }

  onRegister() {

    if (!this.registerObj.firstName || !this.registerObj.phone || !this.registerObj.password || !this.registerObj.email) {
      alert('Please fill in all the required fields');
      return;  // Exit the function if validation fails
    }
    this.trainService.createNewCustomer(this.registerObj).subscribe((res: APIResponse) => {
      if (res.result) {
        alert("Registration Success");
        this.closeRegister();
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.trainService.onLogin(this.loginObj).subscribe((res: APIResponse) => {
      if (res.result) {
        alert("Login Success");
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('trainApp', JSON.stringify(res.data));
          this.closeLogin();
        }
        this.loggedUser = res.data;
         // Reload the page after successful login
      window.location.reload();  // This will reload the entire page
      } else {
        alert(res.message);
      }
    });
  }

  openRegister() {
    const model = document.getElementById("registerModel");
    if (model != null) {
      model.style.display = 'block';
    }
  }

  openLogin() {
    const model = document.getElementById("loginModel");
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeRegister() {
    const model = document.getElementById("registerModel");
    if (model != null) {
      model.style.display = 'none';
    }
  }

  closeLogin() {
    const model = document.getElementById("loginModel");
    if (model != null) {
      model.style.display = 'none';
    }
  }
//admin

  
  
}
