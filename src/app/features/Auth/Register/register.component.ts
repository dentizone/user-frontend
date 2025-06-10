import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { University, UniversityService } from '../../../core/services/university.service';

import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
  universities: University[] = [];
  errorMessage: string = '';
  isLoadingUniversities = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private universityService: UniversityService,
    private toastr: ToastrService
  ) {
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
        universityId: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^1[0125][0-9]{8}$/)],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.loadUniversities();
  }

  loadUniversities() {
    this.isLoadingUniversities = true;
    this.universityService.getSupportedUniversities().subscribe({
      next: (universities) => {
        this.universities = universities;
        this.isLoadingUniversities = false;
      },
      error: (error) => {
        console.error('Failed to load universities:', error);
        this.toastr.error('Failed to load universities. Please try again.');
        this.isLoadingUniversities = false;
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const { name, email, password, academicYear, universityId } = this.registerForm.value;
      const registerData = {
        email,
        password,
        fullName: name,
        username: email.split('@')[0], // Using email prefix as username
        academicYear: parseInt(academicYear.split(' ')[1]),
        universityId
      };

      this.authService.register(registerData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/auth/verification-sent']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Registration failed:', error);
          this.toastr.error(error.error?.Message || 'Registration failed. Please try again.');
        }
      });
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
