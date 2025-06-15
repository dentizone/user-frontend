import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';

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
  selector: 'app-question-answer',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextarea],
  template: `
    <div class="space-y-4">
      <!-- Question -->
      <div class="flex space-x-4">
        <img src="/assets/avatar/dentist.png" class="h-10 w-10 rounded-full" alt="user">
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-gray-800">{{ question.username }}</p>
            <p class="text-sm text-gray-400">{{ question.time }}</p>
          </div>
          <p class="text-gray-600 mt-1">{{ question.text }}</p>
        </div>
      </div>

      <!-- Answer Section -->
      <div class="ml-14 space-y-3">
        <!-- Existing Answer -->
        @if (question.answer) {
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div class="flex items-center space-x-2 mb-2">
              <img src="/assets/avatar/dentist.png" class="h-6 w-6 rounded-full" alt="seller">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-700">{{ question.answer.username }}</span>
                <span class="text-xs text-gray-400">•</span>
                <span class="text-xs text-gray-400">{{ question.answer.time }}</span>
              </div>
            </div>
            <p class="text-gray-700 text-sm leading-relaxed">{{ question.answer.text }}</p>
          </div>
        }

        <!-- Answer Form - Only shown if user is authenticated and no answer exists -->
        @if (isAuthenticated && !question.answer) {
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div class="flex items-center space-x-2 mb-3">
              <img src="/assets/avatar/dentist.png" class="h-6 w-6 rounded-full" alt="seller">
              <span class="text-sm font-medium text-gray-700">Write a Response</span>
            </div>
            <textarea
              pInputTextarea
              [(ngModel)]="newAnswer"
              placeholder="Type your response here..."
              class="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 resize-none"
              rows="3"
              (keydown.enter)="$event.preventDefault()"
            ></textarea>
            <div class="flex justify-between items-center mt-3">
              <p class="text-xs text-gray-500">
                {{ newAnswer.length }}/500 characters
              </p>
              <p-button
                label="Post Response"
                (onClick)="onSubmitAnswer()"
                [disabled]="!newAnswer.trim() || newAnswer.length > 500"
                styleClass="bg-[#0077B6] hover:bg-[#00B4D8] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 text-sm"
              ></p-button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class QuestionAnswerComponent {
  @Input() question!: Question;
  @Input() isAuthenticated: boolean = false;
  @Output() answerSubmitted = new EventEmitter<{ questionId: number; answer: string }>();

  newAnswer: string = '';

  onSubmitAnswer() {
    if (this.newAnswer.trim() && this.newAnswer.length <= 500) {
      this.answerSubmitted.emit({
        questionId: this.question.id,
        answer: this.newAnswer.trim()
      });
      this.newAnswer = '';
    }
  }
} 