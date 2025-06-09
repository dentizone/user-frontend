import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
@Component({
  selector: 'app-forget-password',
  standalone:true,
  imports: [FormsModule, CommonModule,PasswordModule,IftaLabelModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  userEmail='';
  activeTab=0;
  password=''
  confirmPassword=''
  passwordInvalid=false;
  emailInvalid=false;
  isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
  enterEmail(email:string){
    this.userEmail=email;
    if (!this.userEmail || !this.isValidEmail(this.userEmail)) {
    this.emailInvalid = true;

    console.log('wrong'+this.userEmail)
  } else {
    this.emailInvalid = false;
    this.activeTab=1;
    console.log(this.userEmail)
  }
  }
  resendMail(){
    this.activeTab=2;
  }
  submitResetPassword(pass:string,confirmPass:string){
    this.password=pass;
    this.confirmPassword=confirmPass
    if(this.password==this.confirmPassword && this.password!=''){
      this.activeTab=3
    }else{
      this.passwordInvalid=true;
      //this.invalid=true;
    }
  }
}
