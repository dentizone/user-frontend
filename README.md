
# Dentizone - User Frontend

This is the official user-facing frontend for **Dentizone**, a modern e-commerce platform for dental students in Egypt. Built with Angular 19 and Tailwind CSS, this application provides a seamless, secure, and feature-rich experience for buying and selling dental supplies.

**[Live Demo](https://dentizone.store/)** | **[Backend API Repository](https://github.com/dentizone/api)**

## ✨ Features

This single-page application (SPA) is packed with features to deliver a complete marketplace experience.

-   **Modern UI/UX:**
    -   Built with **Angular 19** for a fast and responsive user experience.
    -   Styled with **Tailwind CSS** and **PrimeNG** for a clean and modern design.
    -   Component-based architecture for maintainability and scalability.
    -   Includes shared components like loaders, toasts (notifications), and modals.

-   **Authentication & Security:**
    -   Secure JWT-based authentication flow (Login/Register/Logout).
    -   **Auth Guarding:** Route protection to restrict access based on authentication status.
    -   **HTTP Interceptor:** Automatically attaches auth tokens to API requests and handles token refresh logic seamlessly.
    -   Password recovery flow (Forgot Password).

-   **User-Centric Features:**
    -   **User Profile Dashboard:** A centralized place for users to manage their information, view orders, manage their wallet, and see their listings.
    -   **KYC (Know Your Customer) Workflow:** A guided process for users to verify their identity, unlocking full platform capabilities.
    -   **Favorites:** Users can save their favorite listings for easy access.
    -   **Shopping Cart:** A persistent and fully functional shopping cart.

-   **E-commerce Core:**
    -   **Product Marketplace:** Browse, search, and filter product listings with pagination.
    -   **Advanced Filtering:** Filter products by category, city, price range, and condition.
    -   **Product Creation & Management:** A rich-text editor (`ngx-quill`) powered form for creating and editing posts, including multi-image uploads.
    -   **Detailed Product View:** A dedicated page for each product with an image gallery, detailed description, and a Q&A section.
    -   **Order Management:** Users can view their order history and see detailed status tracking for each order.
    -   **Review System:** Users can submit reviews for completed orders.

-   **Financials:**
    -   **Wallet Dashboard:** View current balance, pending balance, and total revenue.
    -   **Withdrawal System:** Simple interface for users to request fund withdrawals.

## 🛠️ Tech Stack

-   **Framework:** [Angular](https://angular.dev/) v19
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [PrimeNG](https://primeng.org/) components.
-   **State Management:** [RxJS](https://rxjs.dev/) for reactive programming.
-   **HTTP Client:** Angular's `HttpClient` with custom interceptors.
-   **UI Components:**
    -   [PrimeNG](https://primeng.org/) for UI widgets.
    -   [Ngx-Toastr](https://www.npmjs.com/package/ngx-toastr) for notifications.
    -   [Ngx-Quill](https://www.npmjs.com/package/ngx-quill) for the rich text editor.
    -   [Ngx-Owl-Carousel-o](https://www.npmjs.com/package/ngx-owl-carousel-o) for carousels.

## 🏛️ Project Structure

The project follows a standard Angular CLI structure with a feature-based organization to promote modularity and separation of concerns.

```
src/app/
├── core/               # Core services, guards, interceptors, and models.
│   ├── guards/         # Route guards (AuthGuard, NoAuthGuard).
│   ├── interceptors/   # HTTP interceptors (AuthInterceptor).
│   ├── models/         # TypeScript interfaces and enums.
│   └── services/       # Singleton services (AuthService, ApiService).
│
├── features/           # Feature modules, each representing a major part of the app.
│   ├── Auth/           # Login, Register, KYC, etc.
│   ├── Cart/           # Shopping cart and checkout flow.
│   ├── Home/           # The main landing page.
│   ├── ListingPage/    # The product marketplace view.
│   ├── PostView/       # Detailed view of a single post.
│   └── Profile/        # User dashboard components.
│
└── shared/             # Reusable components, directives, and pipes.
    └── components/     # NavBar, Footer, Loader, ProductCard, etc.
```

## 🚀 Getting Started

Follow these steps to get a local development environment running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [Angular CLI](https://angular.dev/cli) v19
    ```bash
    npm install -g @angular/cli
    ```
-   A running instance of the [Dentizone Backend API](https://github.com/dentizone/api).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dentizone/user-frontend.git
    cd dentizone-user-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    The API URL is configured in `src/environments/environment.ts`. Ensure it points to your running backend instance.
    ```typescript
    // src/environments/environment.ts
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:5028' // Example: Your local backend API URL
    };
    ```

4.  **Run the development server:**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`. The application will automatically reload if you change any ofthe source files.

## 📦 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

```bash
ng build --configuration production
```

## ☁️ Deployment

This project is configured for easy deployment on **Vercel**. The presence of the `.vercel/project.json` file indicates that it's linked to a Vercel project, enabling seamless deployments on every `git push`.
