import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KycStatus, UserState } from '../../../core/models/auth.models';
import { AuthService } from '../../../core/services/auth.service';
import { SeoService } from '../../../core/services/seo.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { KycRequiredModalComponent } from '../../Auth/KYC/kyc-required.component';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { AddressFormComponent } from './address-form.component';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    AddressFormComponent,
    ToastComponent,
    KycRequiredModalComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  total: number = 0;
  address: string = '';
  city: string = '';
  showToast = false;
  message = '';
  isSuccess = true;
  showKycModal = false;
  private userKycStatus: string | undefined;
  Toast(message: string) {
    this.message = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.isSuccess = true;
    }, 3000);
  }
  constructor(
    private readonly _cartService: CartService,
    private readonly authService: AuthService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.setMetaTags({
      title: 'Cart | Dentizone',
      description: 'View and manage your dental item cart on Dentizone.',
      keywords: 'cart, dental item, dentizone, Egypt',
    });
    this.authService.currentUser$.subscribe((user) => {
      this.userKycStatus = user?.kycStatus;

      if (
        this.userKycStatus !== KycStatus.Approved ||
        user?.status !== UserState.Active
      ) {
        // Only users with KYC Approved status and Active user state can place orders
        this.showKycModal = true;
      }
    });
    this.loadCart();
  }

  loadCart(): void {
    this._cartService.getCart().subscribe({
      next: (data: Cart[]) => {
        this.cartItems = data;
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
      },
    });
  }

  removeItem(cartId: string) {
    this._cartService.removeFromCart(cartId).subscribe({
      next: () => {
        console.log('item removed');
        this.loadCart();
      },
      error: (err) => {
        console.error('Failed to remove item', err);
      },
    });
  }

  clearCart() {
    this._cartService.clearCart().subscribe({
      next: () => {
        console.log('cart cleared');
        this.loadCart();
      },
      error: (err) => console.error('failed to clear cart', err),
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  checkOut(): void {
    // Prevent checkout if user doesn't have proper status
    if (this.showKycModal || this.userKycStatus !== KycStatus.Approved) {
      this.isSuccess = false;
      this.Toast('KYC verification required before placing orders');
      return;
    }
    const orderRequest = {
      postIds: this.cartItems.map((item) => item.postId),
      shipInfo: {
        address: this.address,
        city: this.city,
      },
    };

    this._cartService.checkOut(orderRequest).subscribe({
      next: () => {
        console.log('Order placed successfully');
        this.Toast('Order placed successfully');
        this.clearCart();
        this.cartItems = [];
        this.address = '';
        this.city = '';
      },
      error: (err) => {
        console.error('Failed to place order', err);
        this.isSuccess = false;
        if (err.status == 403) {
          this.Toast('You are not authorized to do this action');
        } else {
          this.Toast(err.error.Message);
        }
      },
    });
  }

  closeKycModal() {
    this.showKycModal = false;
  }
}
