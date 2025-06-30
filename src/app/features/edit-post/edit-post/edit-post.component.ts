import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditPostService } from '../edit-post.service';
import { PostUnderReviewComponent } from "../../../shared/components/post-under-review/post-under-review.component";
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { ICategory, PostService } from '../../../core/services/post.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  imports: [PostUnderReviewComponent, QuillModule, CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {

  private readonly destroy$ = new Subject<void>();


  userForm!: FormGroup;
  postId!: string;
  isLoading = false;
  errorMessage = '';
  postUnderReview = false;
  invalidSubmit = false;
  netPrice: number = 0;

  categories: ICategory[] = [];
  subCategories: ICategory[] = [];

    // Loading states for categories
  isLoadingCategories = false;
  isLoadingSubcategories = false;

  cities = [
    'Alexandria', 'Aswan', 'Asyut', 'Cairo', 'Damietta',
    'Fayoum', 'Giza', 'Ismailia', 'Luxor', 'Mansoura',
    'Port Said', 'Shubra El-Kheima', 'Suez', 'Tanta', 'Zagazig',
  ];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private editPostService: EditPostService,
    private postService:PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadPost();
    this.loadCategories();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      condition: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      expiryDate: [''],
    });

    this.userForm.get('price')?.valueChanges.subscribe((value) => {
      this.calculateNetPrice(value);
    });
  }

  loadPost(): void {
    this.isLoading = true;
    this.editPostService.getPostById(this.postId).subscribe({
      next: (post: any) => {
        this.userForm.patchValue(post);
        this.calculateNetPrice(post.price);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load post.';
        this.isLoading = false;
      },
    });
  }

  calculateNetPrice(price: number): void {
    const commissionRate = 0.1; // Example 10%
    this.netPrice = price ? price - price * commissionRate : 0;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.invalidSubmit = true;
      return;
    }

    this.isLoading = true;
    this.editPostService
      .updatePost(this.postId, this.userForm.value)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.postUnderReview = true; 
        },
        error: () => {
          this.errorMessage = 'Failed to update post.';
          this.isLoading = false;
        },
      });
  }
  private loadCategories(): void {
      this.isLoadingCategories = true;
      this.postService.getCategories()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (categories) => {
            this.categories = categories;
            this.isLoadingCategories = false;
          },
          error: (error) => {
            console.error('Error fetching categories:', error);
            this.isLoadingCategories = false;
          }
        });
    }

  onSelectCategory(): void {
      const categoryId = this.userForm.get('category')?.value;
      if (!categoryId) {
        this.subCategories = [];
        return;
      }
  
      this.isLoadingSubcategories = true;
      this.postService.getSubcategories(categoryId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (subCategories) => {
            this.subCategories = subCategories;
            this.isLoadingSubcategories = false;
            
            // Auto-select the first subcategory if available
            if (subCategories.length > 0) {
              this.userForm.patchValue({ subcategory: subCategories[0].id });
            } else {
              // Reset subcategory selection if no subcategories available
              this.userForm.patchValue({ subcategory: '' });
            }
          },
          error: (error) => {
            console.error('Error fetching subcategories:', error);
            this.isLoadingSubcategories = false;
            this.userForm.patchValue({ subcategory: '' });
          }
        });
    }
}