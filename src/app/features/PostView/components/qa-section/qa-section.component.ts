import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';
import { QuestionAnswerComponent } from '../question-answer/question-answer.component';

interface Answer {
  id: number;
  username: string;
  text: string;
  time: string;
}

interface Question {
  id: number;
  username: string;
  text: string;
  time: string;
  answer?: Answer;
}

@Component({
  selector: 'app-qa-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextarea, QuestionAnswerComponent],
  template: `
    <div class="mt-8 bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-gray-800">Q&A Section</h2>
        <span class="text-sm text-gray-500">{{ questions.length }} Questions</span>
      </div>

      <!-- Questions List -->
      <div class="space-y-6">
        @for (question of questions; track question.id) {
          <app-question-answer
            [question]="question"
            (answerSubmitted)="onAnswerSubmitted($event)"
          ></app-question-answer>
        }
      </div>

      <!-- New Question Form - Only shown if user is authenticated -->
      @if (isAuthenticated) {
        <div class="mt-8 pt-6 border-t border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Ask a Question</h3>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div class="flex items-center space-x-2 mb-3">
                <img src="/assets/avatar/dentist.png" class="h-6 w-6 rounded-full" alt="user">
                <span class="text-sm font-medium text-gray-700">Write a Question</span>
              </div>
              <textarea
                pInputTextarea
                [(ngModel)]="newQuestion"
                placeholder="Type your question here..."
                class="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 resize-none"
                rows="3"
                (keydown.enter)="$event.preventDefault()"
              ></textarea>
              <div class="flex justify-between items-center mt-3">
                <p class="text-xs text-gray-500">
                  {{ newQuestion.length }}/500 characters
                </p>
                <p-button
                  label="Post Question"
                  (onClick)="onSubmitQuestion()"
                  [disabled]="!newQuestion.trim() || newQuestion.length > 500"
                  styleClass="bg-[#0077B6] hover:bg-[#00B4D8] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 text-sm"
                ></p-button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class QaSectionComponent {
  @Input() questions: Question[] = [];
  @Input() isAuthenticated: boolean = false;
  @Output() questionSubmitted = new EventEmitter<string>();
  @Output() answerSubmitted = new EventEmitter<{ questionId: number; answer: string }>();

  newQuestion: string = '';

  onSubmitQuestion() {
    if (this.newQuestion.trim() && this.newQuestion.length <= 500) {
      this.questionSubmitted.emit(this.newQuestion.trim());
      this.newQuestion = '';
    }
  }

  onAnswerSubmitted(event: { questionId: number; answer: string }) {
    this.answerSubmitted.emit(event);
  }
} 