import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-sent-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div class="mb-6">
          <svg
            class="mx-auto h-16 w-16 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Check Your Email</h2>
        <p class="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>
      </div>
    </div>
  `,
})
export class VerificationSentModalComponent {}
