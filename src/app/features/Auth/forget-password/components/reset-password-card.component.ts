import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password-card',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule],
  template: `
    <div
      class="flex flex-col items-center p-6 rounded-xl shadow-sm h-[500px]"
      [ngClass]="{
        'opacity-10': !isActive,
        'hidden md:flex': shouldHide
      }"
    >
      <div
        class="bg-[#187FB7] w-24 h-24 flex items-center justify-center rounded-2xl mb-6"
      >
        <img
          src="/assets/Icons/reset-password.png"
          class="w-12 h-12 object-contain"
        />
      </div>
      <div class="text-center w-full flex-1 flex flex-col">
        <h3 class="text-xl font-bold mb-2">Set new password</h3>
        <p class="text-sm text-gray-600 mb-6">
          Enter the new password (Must be at least 8 characters).
        </p>
        <form
          class="w-full flex-1 flex flex-col"
          (ngSubmit)="onSubmit($event)"
        >
          <div class="flex-1">
            <div class="mb-4">
              <label
                for="reset-password"
                class="block text-sm font-medium text-gray-700 mb-1.5 text-left"
                >Password</label
              >
              <p-password
                #passInput
                id="reset-password"
                [disabled]="!isActive || isLoading"
                [(ngModel)]="password"
                [ngModelOptions]="{ standalone: true }"
                (onFocus)="onPasswordFocus()"
                [feedback]="false"
                styleClass="w-full"
                [inputStyle]="{
                  width: '100%',
                  'background-color': '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  color: '#111827',
                  'font-size': '0.875rem',
                  'border-radius': '0.5rem',
                  padding: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  'padding-right': '2.5rem'
                }"
                [style]="{ width: '100%' }"
              />
            </div>
            <div class="mb-4">
              <label
                for="confirm-password"
                class="block text-sm font-medium text-gray-700 mb-1.5 text-left"
                >Confirm Password</label
              >
              <p-password
                #confirmPassInput
                id="confirm-password"
                [disabled]="!isActive || isLoading"
                [(ngModel)]="confirmPassword"
                [ngModelOptions]="{ standalone: true }"
                (onFocus)="onPasswordFocus()"
                [feedback]="false"
                styleClass="w-full"
                [inputStyle]="{
                  width: '100%',
                  'background-color': '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  color: '#111827',
                  'font-size': '0.875rem',
                  'border-radius': '0.5rem',
                  padding: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  'padding-right': '2.5rem'
                }"
                [style]="{ width: '100%' }"
              />
            </div>
          </div>
          <div class="mt-auto">
            <p
              class="text-sm text-red-500 mb-3"
              [ngClass]="{ hidden: !passwordInvalid }"
            >
              <span class="font-medium">{{ passwordErrorMessage }}</span>
            </p>
            <button
              [disabled]="!isActive || isLoading"
              type="submit"
              class="w-full bg-[#187FB7] hover:bg-[#187fb7c7] py-3 rounded-3xl text-white font-semibold transition-colors flex items-center justify-center"
            >
              <span *ngIf="isLoading" class="mr-2">
                <i class="pi pi-spin pi-spinner"></i>
              </span>
              {{ isLoading ? "Resetting..." : "Change Password" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ResetPasswordCardComponent {
  @Input() isActive = false;
  @Input() shouldHide = false;
  @Input() passwordInvalid = false;
  @Input() passwordErrorMessage = '';
  @Input() isLoading = false;
  
  password = '';
  confirmPassword = '';
  
  @Output() passwordSubmit = new EventEmitter<{password: string, confirmPassword: string}>();
  @Output() passwordFocus = new EventEmitter<void>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.passwordSubmit.emit({
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  onPasswordFocus() {
    this.passwordFocus.emit();
  }
}
