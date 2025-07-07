import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      class="min-h-[70vh] flex flex-col items-center justify-center  py-32 px-4"
    >
      <div
        class="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center"
      >
        <h1 class="text-4xl font-extrabold text-blue-900 mb-2">
          Maximize Your Profits
        </h1>
        <p class="text-lg text-gray-700 mb-6">
          <span class="font-bold text-green-600">100% FREE</span> for buyers to
          shop.<br />
          Sellers keep
          <span class="text-3xl font-bold text-blue-700">98%</span> of every
          sale —
          <span class="font-semibold text-blue-700"
            >industry-leading rates!</span
          >
        </p>
        <div
          class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl p-8 mb-6 w-full overflow-hidden"
        >
          <!-- Animated background elements -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"
          ></div>
          <div
            class="absolute top-4 right-4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"
          ></div>
          <div
            class="absolute bottom-4 left-4 w-12 h-12 bg-purple-400/20 rounded-full blur-lg"
          ></div>

          <!-- Content -->
          <div class="relative z-10 flex flex-col items-center">
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-white/60 text-xl font-medium">Only</span>
              <span class="text-6xl font-black text-white tracking-tight"
                >2</span
              >
              <span class="text-3xl font-bold text-blue-300">%</span>
            </div>
            <div
              class="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-2"
            >
              <span class="text-white font-semibold">Success Fee</span>
            </div>
            <div class="text-blue-200 text-lg font-medium mb-1">
              You Keep 98%
            </div>
            <div class="flex gap-4 text-sm text-white/70">
              <span class="flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                No hidden fees
              </span>
              <span class="flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                No monthly charges
              </span>
            </div>
          </div>
        </div>
        <div
          class="bg-yellow-50 rounded-lg p-4 mb-6 w-full border-l-4 border-yellow-400"
        >
          <p class="text-sm text-yellow-800">
            <span class="font-bold">💡 Smart Pricing:</span> You only pay when
            you make money. No upfront costs, no risk!
          </p>
        </div>
        <a
          routerLink="/add-new-post"
          class="mt-4 inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg transform hover:scale-105"
        >
          🚀 Start Earning Today
        </a>
        <p class="text-xs text-gray-500 mt-3">
          Join thousands of successful sellers • No commitment required
        </p>
      </div>
    </div>
  `,
})
export class PricingComponent implements OnInit {
  constructor(private seo: SeoService) {}
  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Pricing | Dentizone',
      description:
        'Check out pricing for dental items and services on Dentizone.',
      keywords: 'pricing, dentizone, dental items, services, Egypt',
    });
  }
}
