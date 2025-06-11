import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check-email-card',
  standalone: true,
  imports: [CommonModule],
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
        <img src="/assets/Icons/mail.png" class="w-12 h-12 object-contain" />
      </div>
      <div class="text-center flex-1 flex flex-col">
        <h3 class="text-xl font-bold mb-4">Check your email</h3>
        <p class="text-sm text-gray-600 mb-8">
          An email is sent to you verify it is you to reset your password you
          can not change or reset your password without email verification.
        </p>
        <div class="mt-auto">
          <p
            class="text-sm text-green-600 mb-3"
            [ngClass]="{ hidden: !resendSuccessMessage }"
          >
            <span class="font-medium">{{ resendSuccessMessage }}</span>
          </p>
          <p
            class="text-sm text-red-500 mb-3"
            [ngClass]="{ hidden: !resendErrorMessage }"
          >
            <span class="font-medium">{{ resendErrorMessage }}</span>
          </p>
          <button
            [disabled]="!isActive || isLoading"
            (click)="onResendMail()"
            class="w-full bg-[#187FB7] hover:bg-[#187fb7c7] py-3 rounded-3xl text-white font-semibold transition-colors flex items-center justify-center"
          >
            <span *ngIf="isLoading" class="mr-2">
              <i class="pi pi-spin pi-spinner"></i>
            </span>
            {{ isLoading ? "Sending..." : "Resend Mail" }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class CheckEmailCardComponent {
  @Input() isActive = false;
  @Input() shouldHide = false;
  @Input() resendSuccessMessage = '';
  @Input() resendErrorMessage = '';
  @Input() isLoading = false;
  
  @Output() resendMail = new EventEmitter<void>();

  onResendMail() {
    this.resendMail.emit();
  }
}
