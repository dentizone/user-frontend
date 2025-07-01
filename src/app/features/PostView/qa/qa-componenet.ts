import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { QaSectionComponent } from '../components/qa-section/qa-section.component';
import { ActivatedRoute, Route } from '@angular/router';
import { QAService } from '../service/qa.service';
import { ProfileService } from '../../Profile/service/profile.service';

@Component({
  selector: 'app-qa-component',
  standalone: true,
  imports: [CommonModule, CarouselModule, QaSectionComponent],
  templateUrl: 'qa-component.html',
})
export class QaComponent implements OnInit{
  productID='';
  authorized=false;
  userID:any;
  @Input() sellerID!:string;
  @Output() toastMessage = new EventEmitter<{ message: string; isSuccess: boolean }>();

  constructor(private route:ActivatedRoute,private qaService:QAService,private profileService:ProfileService){}
  ngOnInit(): void {
    this.productID=this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions();
    this.profileService.getUserProfile().subscribe({
      next:data=>{
        this.userID=data.id; 
        //console.log(data.id)
        if(this.userID===this.sellerID)
        {this.authorized=true}
        //console.log(this.userID,' seller  ',this.sellerID,'    ',this.authorized);
      }
    })
    
  }
  loadQuestions(){
    this.qaService.getQaByPostId(this.productID).subscribe({
      next:(data)=>{
        this.questions=data;
      },
      error:(err)=>{
        // this.isSuccess=false;
        // this.Toast("Something went wrong please refresh the page");
      }
    })
  }
  images: string[] = [
    '/assets/items/image1.png',
    '/assets/items/image2.png',
    '/assets/items/image3.png',
    '/assets/items/image4.png'
  ];
  
  activeIndex: number = 0;
  page: number = 0;
  isAuthenticated: boolean = false; // This should come from your auth service

  onPageChange(event: any) {
    this.activeIndex = event.page;
  }

  onThumbnailClick(index: number) {
    this.activeIndex = index;
    this.page = index;
  }

  questions = [
    {
    answer:{
      createdAt:'',
      id:'',
      responderName:'',
      text:''
    },
    askerName:'',
    createdAt:'',
    id:'',
    text:'' }
  ];

  onQuestionSubmitted(question: string) {
    console.log('New question:', question);
    this.qaService.addNewQuestion(this.productID,question).subscribe({
      next: (data) => {
      console.log('question added');
      this.toastMessage.emit({
        message: 'Your question has been submitted!',
        isSuccess: true
      });
    },
    error: (err) => {
      console.log(err);
      this.toastMessage.emit({
        message: 'Failed to submit question. Please try again.',
        isSuccess: false
      });
    }
  });
}


  onAnswerSubmitted(event: { questionId: string; answer: string }) {
    console.log('New answer:', event);
    this.qaService.addAnswer(event.questionId,event.answer).subscribe({
      next: (data) => {
      console.log('Answer added');
      this.toastMessage.emit({
        message: 'Your Answer has been submitted!',
        isSuccess: true
      });
    },
    error: (err) => {
      console.log(err);
      this.toastMessage.emit({
        message: 'Failed to submit question. Please try again.',
        isSuccess: false
      });
    }
  });
}
}