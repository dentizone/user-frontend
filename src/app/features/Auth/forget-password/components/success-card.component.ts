import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="shouldShow"
      class="flex flex-col items-center p-6 rounded-xl shadow-sm h-[500px]"
      [ngClass]="{
        'opacity-10': !isActive,
        'hidden md:flex': shouldHide
      }"
    >
      <div
        class="bg-[#187FB7] w-24 h-24 flex items-center justify-center rounded-2xl mb-6"
      >
        <img src="/assets/Icons/accept.png" class="w-12 h-12 object-contain" />
      </div>
      <div class="text-center flex-1 flex flex-col">
        <h3 class="text-xl font-bold mb-4">All Done!</h3>
        <p class="text-sm text-gray-600 mb-8">
          Your password has been reset. You can go back to login to open your
          account
        </p>
        <div class="mt-auto">
          <button
            [disabled]="!isActive"
            (click)="onGoToLogin()"
            class="w-full bg-[#187FB7] hover:bg-[#187fb7c7] py-3 rounded-3xl text-white font-semibold transition-colors"
          >
            Go Back to Login
          </button>
        </div>
      </div>
    </div>
  `
})
export class SuccessCardComponent {
  @Input() isActive = false;
  @Input() shouldShow = false;
  @Input() shouldHide = false;
  
  @Output() goToLogin = new EventEmitter<void>();

  onGoToLogin() {
    this.goToLogin.emit();
  }
}
