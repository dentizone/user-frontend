import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../Profile/service/profile.service';
import { QaSectionComponent } from '../components/qa-section/qa-section.component';
import { QAService } from '../service/qa.service';

@Component({
  selector: 'app-qa-component',
  standalone: true,
  imports: [CommonModule, CarouselModule, QaSectionComponent],
  templateUrl: 'qa-component.html',
})
export class QaComponent implements OnInit {
  @Input() postId!: string;
  authorized = false;
  userID: any;
  @Input() sellerID!: string;
  @Output() toastMessage = new EventEmitter<{
    message: string;
    isSuccess: boolean;
  }>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly qaService: QAService,
    private readonly profileService: ProfileService,
    public readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadQuestions();
    if (this.authService.isAuthenticated()) {
      this.profileService.getUserProfile().subscribe({
        next: (data) => {
          this.userID = data.id;
          if (this.userID === this.sellerID) {
            this.authorized = true;
          }
        },
      });
    }
  }
  loadQuestions() {
    this.qaService.getQaByPostId(this.postId).subscribe({
      next: (data) => {
        this.questions = data;
      },
    });
  }
  images: string[] = [
    '/assets/items/image1.png',
    '/assets/items/image2.png',
    '/assets/items/image3.png',
    '/assets/items/image4.png',
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
      answer: {
        createdAt: '',
        id: '',
        responderName: '',
        text: '',
      },
      askerName: '',
      createdAt: '',
      id: '',
      text: '',
    },
  ];

  onQuestionSubmitted(question: string) {
    console.log('New question:', question);
    this.qaService.addNewQuestion(this.postId, question).subscribe({
      next: (data) => {
        console.log('question added');
        this.toastMessage.emit({
          message: 'Your question has been submitted!',
          isSuccess: true,
        });
        this.loadQuestions();
      },
      error: (err) => {
        console.log(err);
        this.toastMessage.emit({
          message: 'Failed to submit question. Please try again.',
          isSuccess: false,
        });
      },
    });
  }

  onAnswerSubmitted(event: { questionId: string; answer: string }) {
    console.log('New answer:', event);
    this.qaService.addAnswer(event.questionId, event.answer).subscribe({
      next: (data) => {
        console.log('Answer added');
        this.toastMessage.emit({
          message: 'Your Answer has been submitted!',
          isSuccess: true,
        });
        this.loadQuestions();
      },
      error: (err) => {
        console.log(err);
        this.toastMessage.emit({
          message: 'Failed to submit answer. Please try again.',
          isSuccess: false,
        });
      },
    });
  }
}
