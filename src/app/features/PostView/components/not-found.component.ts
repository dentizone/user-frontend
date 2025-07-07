import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div
      class="flex flex-col items-center justify-center min-h-[60vh] text-center p-8"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mb-6"
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke="#0077B6"
          stroke-width="8"
          fill="#E0F2FE"
        />
        <path
          d="M40 80 Q60 100 80 80"
          stroke="#0077B6"
          stroke-width="4"
          stroke-linecap="round"
          fill="none"
        />
        <ellipse cx="48" cy="54" rx="6" ry="8" fill="#0077B6" />
        <ellipse cx="72" cy="54" rx="6" ry="8" fill="#0077B6" />
        <ellipse cx="48" cy="56" rx="2" ry="3" fill="#fff" />
        <ellipse cx="72" cy="56" rx="2" ry="3" fill="#fff" />
        <rect x="52" y="70" width="16" height="4" rx="2" fill="#0077B6" />
      </svg>
      <h1 class="text-4xl font-extrabold text-blue-900 mb-2">404</h1>
      <h2 class="text-2xl font-bold text-blue-700 mb-4">Post Not Found</h2>
      <p class="text-gray-500 mb-6 max-w-md">
        Sorry, the post you are looking for does not exist or has been
        removed.<br />
        Please check the URL or return to the homepage.
      </p>
      <a
        routerLink="/"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all"
        >Go Home</a
      >
    </div>
  `,
  styles: [``],
})
export class NotFoundComponent {}
