import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { ReviewService } from '../review.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
@Component({
  selector: 'app-review',
  imports: [CommonModule,FormsModule,ToastComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  orderId='';
  showToast=false;
  isSuccess=true;
  message: string='';

  constructor(private route:ActivatedRoute,private navigationRoute:Router,private service:ReviewService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.orderId=params['orderId'];
    })
  }
  
  Toast(message:string){
    this.message=message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      if(this.isSuccess){
        this.navigationRoute.navigate(['/home']);
      }else{
        this.isSuccess=true;
      }
   }, 2000);
  }
  
  userComment='';
  userPointOfView='';      //nininnininnin
  value = 5;
  hovered = 0;
  stars = Array(5).fill(0);

  rate(star: number) {
    this.value = star;
  }

  hover(star: number) {
    this.hovered = star;
  }
  SubmitReview(){
    if(!this.orderId){
      this.isSuccess=false;
      this.Toast("order ID not found");
      return;
    }
    let comment="User comment is "+this.userComment+" User improvement is "+this.userPointOfView;
    this.service.postNewReview(this.orderId,this.value,comment)
    .subscribe({
      next:()=>this.Toast('Review Submited Successfully'),
      error:err=>{console.log('review failed',err);
        this.isSuccess=false;
        if(err.status==403){
        this.Toast('You are not authorized to do this action');
      }else{
        this.Toast(err.error.Message);
      }
      }
    })
    
  }
}
