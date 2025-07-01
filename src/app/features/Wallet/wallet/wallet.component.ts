import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  imports: [FormsModule, CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  currentBalance = 0;
  pendingBalance = 0;
  totalRevenue = 0;
  withdrawAmount: number = 0;

  constructor(private walletService: WalletService) {}

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
      }
    });
  }

 submitWithdrawal() {

  this.walletService.withdarawalRequest({ amount: this.withdrawAmount }).subscribe({
    next: (res) => {
      alert("Withdrawal request submitted successfully.");
     
      this.getCurrentBalance();
    },
    error: (err) => {
      console.error(err);
      alert("Something went wrong during withdrawal.");
    }
  });
}
}