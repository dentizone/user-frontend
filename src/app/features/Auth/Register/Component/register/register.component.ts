import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  academicYears = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
  cities = [
    'Alexandria',
    'Aswan',
    'Asyut',
    'Cairo',
    'Damietta',
    'Fayoum',
    'Giza',
    'Ismailia',
    'Luxor',
    'Mansoura',
    'Port Said',
    'Shubra El-Kheima',
    'Suez',
    'Tanta',
    'Zagazig',
  ];
  universities = [
    'Ain Shams University',
    'Alexandria University',
    'Al-Azhar University (Boys & Girls)',
    'Assiut University',
    'Benha University',
    'Beni Suef University',
    'Cairo University',
    'Damanhour University',
    'Delta University for Science and Technology',
    'Egyptian Russian University',
    'Future University in Egypt (FUE)',
    'Helwan University',
    'Horus University',
    'Kafr El-Sheikh University',
    'Menoufia University',
    'Minia University',
    'Misr International University (MIU)',
    'Modern Sciences and Arts University (MSA)',
    'October 6 University',
    'Pharos University in Alexandria',
    'Sinai University',
    'Sohag University',
    'South Valley University',
    'Suez Canal University',
    'Tanta University',
    'University of Sadat City',
    'Zagazig University',
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        academicYear: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        city: ['', Validators.required],
        university: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // TODO: Implement registration logic
      console.log(this.registerForm.value);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
