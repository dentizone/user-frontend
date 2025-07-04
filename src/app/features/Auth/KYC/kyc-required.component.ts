import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-required-modal',
  standalone: true,
  template: `
    <div
      class="fixed inset-0 bg-[#CAF0F861] bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      (click)="onBackdropClick($event)"
    >
      <div
        class="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-blue-100 relative"
        (click)="$event.stopPropagation()"
      >
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          (click)="handleClose()"
          aria-label="Close"
        >
          &times;
        </button>
        <div class="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#0077B6"
            class="w-16 h-16 drop-shadow-lg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 20.25v-1.5A2.25 2.25 0 016.75 16.5h10.5a2.25 2.25 0 012.25 2.25v1.5"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-[#0077B6] mb-3 tracking-tight">
          Verification Required
        </h2>
        <div class="flex items-center justify-center gap-2 mb-7">
          <p class="text-gray-700 text-base">
            You must complete KYC verification to perform this action.
          </p>
        </div>
        <button
          (click)="startKyc()"
          class="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:from-[#005f87] hover:to-[#0096c7] transition flex items-center justify-center gap-2 text-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <span>Start KYC Process</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 12H6.75m7.5-6l6 6-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class KycRequiredModalComponent {
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) {}
  onBackdropClick(event: MouseEvent) {
    this.handleClose();
  }
  handleClose() {
    this.close.emit();
    this.router.navigate(['/profile']);
  }
  startKyc() {
    this.router.navigate(['/auth/kyc']);
  }
}
