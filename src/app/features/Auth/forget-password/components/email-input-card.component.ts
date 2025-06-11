import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-email-input-card',
  standalone: true,
  imports: [CommonModule, FormsModule, IftaLabelModule],
  template: `
    <div
      class="flex flex-col items-center p-6 rounded-xl shadow-sm h-[500px]"
      [ngClass]="{
        'opacity-10': !isActive,
        'hidden md:flex': !isActive
      }"
    >
      <div
        class="bg-[#187FB7] w-24 h-24 flex items-center justify-center rounded-2xl mb-6"
      >
        <img src="/assets/Icons/padlock.png" class="w-12 h-12 object-contain" />
      </div>
      <div class="text-center w-full flex-1 flex flex-col">
        <h3 class="text-xl font-bold mb-2">Forget Password?</h3>
        <p class="text-sm text-gray-600 mb-6">
          Enter your email to reset your password
        </p>
        <form
          class="w-full flex-1 flex flex-col"
          (submit)="onSubmit($event)"
        >
          <div class="mb-4 flex-1">
            <label
              for="email-address-icon"
              class="block text-sm font-medium text-gray-700 mb-1.5"
              >Email</label
            >
            <p-iftalabel class="w-full block">
              <input
                #emailInput
                [ngClass]="{ 'ng-dirty ng-invalid': emailInvalid }"
                [disabled]="!isActive"
                (focus)="onEmailFocus()"
                required="true"
                type="email"
                id="email-address-icon"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-3.5 focus:ring-2 focus:ring-[#187FB7] focus:border-[#187FB7] outline-none transition-all"
              />
            </p-iftalabel>
          </div>
          <div class="mt-auto">
            <p
              class="text-sm text-red-500 mb-3"
              [ngClass]="{ hidden: !emailInvalid }"
            >
              <span class="font-medium">{{ emailErrorMessage }}</span>
            </p>
            <button
              [disabled]="!isActive || isLoading"
              type="submit"
              class="w-full bg-[#187FB7] hover:bg-[#187fb7c7] py-3 rounded-3xl text-white font-semibold transition-colors flex items-center justify-center"
            >
              <span *ngIf="isLoading" class="mr-2">
                <i class="pi pi-spin pi-spinner"></i>
              </span>
              {{ isLoading ? "Sending..." : "Verify Email" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EmailInputCardComponent {
  @Input() isActive = false;
  @Input() emailInvalid = false;
  @Input() emailErrorMessage = '';
  @Input() isLoading = false;
  
  @Output() emailSubmit = new EventEmitter<string>();
  @Output() emailFocus = new EventEmitter<void>();

  onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const emailInput = target.querySelector('#email-address-icon') as HTMLInputElement;
    this.emailSubmit.emit(emailInput.value);
  }

  onEmailFocus() {
    this.emailFocus.emit();
  }
}
