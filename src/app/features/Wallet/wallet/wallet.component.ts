import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-wallet',
  imports: [FormsModule, CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css',
})
export class WalletComponent implements OnInit {
  currentBalance = 0;
  pendingBalance = 0;
  totalRevenue = 0;
  withdrawAmount: number = 0;

  constructor(
    private readonly walletService: WalletService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrentBalance();
  }

  getCurrentBalance() {
    this.walletService.getBalance().subscribe({
      next: (data: any) => {
        this.currentBalance = data?.balance ?? 0;
        this.pendingBalance = data?.pending ?? 0;
        this.totalRevenue = data?.totalRevene ?? 0;
      },
      error: () => {
        this.currentBalance = 0;
        this.pendingBalance = 0;
        this.totalRevenue = 0;
      },
    });
  }

  submitWithdrawal() {
    this.walletService
      .withdarawalRequest({ amount: this.withdrawAmount })
      .subscribe({
        next: (res) => {
          this.toastr.success('Withdrawal request submitted successfully.');
          this.withdrawAmount = 0;

          this.getCurrentBalance();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(
            err.error?.Message || 'Something went wrong during withdrawal.'
          );
        },
      });
  }
}
