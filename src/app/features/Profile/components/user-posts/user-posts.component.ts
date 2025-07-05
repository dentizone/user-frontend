import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { Post } from '../../../../core/models/posts';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-user-posts',
  imports: [CommonModule, RouterLink, QuillModule, DatePipe],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
  Current: Post[] = [];
  constructor(
    private readonly profileService: ProfileService,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.profileService.getUserPosts().subscribe({
      next: (data) => {
        this.Current = data;
      },
      error: (err) => {
        this.Current = [];
        console.log(err);
      },
    });
  }

  // Method to sanitize HTML content
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Method to truncate the HTML content
  trimQuillContent(html: string): SafeHtml {
    // Create a temporary div to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Get plain text to check length
    const textContent = tempDiv.textContent ?? tempDiv.innerText ?? '';

    // If the text is short enough, return the original HTML
    if (textContent.length <= 150) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    // Simple truncation for text nodes
    let truncated = '';
    let charCount = 0;
    const maxChars = 150;

    // Process each child node
    const processNode = (node: Node, output: string): string => {
      if (charCount >= maxChars) return output;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';
        const remainingChars = maxChars - charCount;

        if (charCount + text.length <= maxChars) {
          // Add the entire text
          output += text;
          charCount += text.length;
        } else {
          // Add truncated text with ellipsis
          output += text.substring(0, remainingChars) + '...';
          charCount = maxChars;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();

        // Skip certain elements
        if (['script', 'style'].includes(tagName)) {
          return output;
        }

        // Start tag
        output += `<${tagName}`;
        for (const attr of element.attributes) {
          output += ` ${attr.name}="${attr.value}"`;
        }
        output += '>';

        // Process children
        for (const childNode of element.childNodes) {
          if (charCount >= maxChars) break;
          output = processNode(childNode, output);
        }

        // End tag
        output += `</${tagName}>`;
      }

      return output;
    };

    // Process the root nodes
    for (const childNode of tempDiv.childNodes) {
      if (charCount >= maxChars) break;
      truncated = processNode(childNode, truncated);
    }

    return this.sanitizer.bypassSecurityTrustHtml(truncated);
  }

  trackById(index: number, item: Post) {
    return item.id;
  }

  onEditPost(id: string) {
    this.router.navigate(['/edit-post', id]);
  }

  onAddNewPost() {
    this.router.navigate(['/add-new-post']);
  }
}
