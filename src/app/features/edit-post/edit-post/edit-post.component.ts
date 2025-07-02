import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  status: string = '';
  seller: any = null;
  assets: any[] = [];
  createdAt: string = '';
  updatedAt: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  imageIDs: string[] = [];
  imageUploadStates: ImageUploadState[] = [];
  imagePreviews: string[] = [];
  selectedImg: ImagePreview = { path: '/assets/Icons/image-gallery.png', index: 0 };
  isUploadingAnyImage = false;
  invalid = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private editPostService: EditPostService,
    private postService:PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
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
        // Find category ID by name
        const category = this.categories.find(cat => cat.name === post.category);
        const categoryId = category ? category.id : '';
        // Patch category first
        this.userForm.patchValue({
          category: categoryId
        });
        // Load subcategories for this category, then patch subcategory
        if (categoryId) {
          this.isLoadingSubcategories = true;
          this.postService.getSubcategories(categoryId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (subCategories) => {
                this.subCategories = subCategories;
                this.isLoadingSubcategories = false;
                // Find subcategory ID by name
                const subCategory = subCategories.find(sub => sub.name === post.subCatgory);
                const subCategoryId = subCategory ? subCategory.id : '';
                this.userForm.patchValue({
                  subcategory: subCategoryId
                });
              },
              error: () => {
                this.isLoadingSubcategories = false;
                this.userForm.patchValue({ subcategory: '' });
              }
            });
        }
        // Patch the rest of the form
        this.userForm.patchValue({
          title: post.title,
          description: post.description,
          price: post.price,
          expiryDate: post.expireDate ? post.expireDate.split('T')[0] : '',
          condition: post.condition ? post.condition.toLowerCase() : '',
          // category and subcategory already handled
          // city and address are not in the API response, keep as is
        });
        this.status = post.status;
        this.seller = post.seller;
        this.assets = post.assets;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        this.calculateNetPrice(post.price);
        this.initializeImagesFromAssets();
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
    // Check if we have any successfully uploaded images
    const successfulUploads = this.imageUploadStates.filter(state => state.uploadSuccess);
    if (successfulUploads.length === 0) {
      this.invalid = true;
      return;
    }
    const formValue = this.userForm.value;
    const conditionValue = formValue.condition === 'new' ? 1 : 0;
    const postData = {
      title: formValue.title,
      description: formValue.description,
      price: formValue.price,
      condition: conditionValue,
      street: formValue.address,
      city: formValue.city,
      categoryId: formValue.category,
      subCategoryId: formValue.subcategory,
      expireDate: formValue.expiryDate || undefined,
      assetIds: this.imageIDs
    };
    this.isLoading = true;
    this.editPostService
      .updatePost(this.postId, postData)
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
            this.loadPost();
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

  // Image upload logic
  onFileSelected(event: any): void {
    this.invalid = false;
    const files: FileList = event.target.files;
    this.errorMessage = '';
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Only image files are allowed.';
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const preview = e.target.result;
        const uploadState: ImageUploadState = {
          file,
          preview,
          isUploading: true,
          uploadSuccess: false
        };
        this.imageUploadStates.push(uploadState);
        this.imagePreviews.push(preview);
        if (this.imagePreviews.length === 1) {
          this.selectedImg = { path: preview, index: 0 };
        }
        this.updateUploadingState();
        this.uploadImage(uploadState, this.imageUploadStates.length - 1);
      };
      reader.readAsDataURL(file);
    }
    this.resetFileInput();
  }

  private uploadImage(uploadState: ImageUploadState, index: number): void {
    uploadState.isUploading = true;
    uploadState.uploadError = undefined;
    this.updateUploadingState();
    if (uploadState.file) {
      this.postService.uploadImage(uploadState.file)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            uploadState.isUploading = false;
            uploadState.uploadSuccess = true;
            uploadState.imageId = response.id;
            this.imageIDs.push(response.id);
            this.updateUploadingState();
          },
          error: (error) => {
            uploadState.isUploading = false;
            uploadState.uploadError = 'Failed to upload image. Please try again.';
            uploadState.uploadSuccess = false;
            this.updateUploadingState();
          }
        });
    }
  }

  onDeleteImage(index: number): void {
    const uploadState = this.imageUploadStates[index];
    if (uploadState && uploadState.imageId) {
      const imageId = uploadState.imageId;
      this.postService.deleteImage(imageId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            const imageIdIndex = this.imageIDs.indexOf(imageId);
            if (imageIdIndex > -1) {
              this.imageIDs.splice(imageIdIndex, 1);
            }
          },
          error: () => {
            const imageIdIndex = this.imageIDs.indexOf(imageId);
            if (imageIdIndex > -1) {
              this.imageIDs.splice(imageIdIndex, 1);
            }
          }
        });
    }
    this.imageUploadStates.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    if (this.imagePreviews.length > 0) {
      this.selectedImg = { path: this.imagePreviews[0], index: 0 };
    } else {
      this.selectedImg = { path: '/assets/Icons/image-gallery.png', index: 0 };
    }
    this.resetFileInput();
  }

  onSelectImage(path: string, index: number): void {
    this.selectedImg = { path, index };
  }

  private resetFileInput(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  private updateUploadingState(): void {
    this.isUploadingAnyImage = this.imageUploadStates.some(state => state.isUploading);
  }

  // On load, initialize image upload state from assets
  private initializeImagesFromAssets(): void {
    if (this.assets && this.assets.length > 0) {
      this.imageIDs = this.assets.map(asset => asset.id);
      this.imagePreviews = this.assets.map(asset => asset.url);
      this.imageUploadStates = this.assets.map((asset, idx) => ({
        file: null,
        preview: asset.url,
        isUploading: false,
        uploadSuccess: true,
        imageId: asset.id
      }));
      this.selectedImg = { path: this.imagePreviews[0], index: 0 };
    }
  }
}

// Add interfaces
interface ImagePreview {
  path: string;
  index: number;
}
interface ImageUploadState {
  file: File | null;
  preview: string;
  isUploading: boolean;
  uploadError?: string;
  uploadSuccess: boolean;
  imageId?: string;
}