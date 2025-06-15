import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { QuillEditorComponent } from 'ngx-quill';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { PostService, ICategory, IPost } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';

import "quill/dist/quill.core.css";

interface ImagePreview {
  path: string;
  index: number;
}

interface ImageUploadState {
  file: File;
  preview: string;
  isUploading: boolean;
  uploadError?: string;
  uploadSuccess: boolean;
  imageId?: string;
}

@Component({
  selector: 'app-add-new-post',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    QuillEditorComponent
  ],
  templateUrl: './add-new-post.component.html',
  styleUrl: './add-new-post.component.css'
})
export class AddNewPostComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  categories: ICategory[] = [];
  subCategories: ICategory[] = [];
  userForm!: FormGroup;
  imageIDs: string[] = [];
  invalidSubmit = false;
  invalid = false;
  isLoading = false;
  
  // Loading states for categories
  isLoadingCategories = false;
  isLoadingSubcategories = false;
  
  // Image handling
  selectedImages: File[] = [];
  selectedImg: ImagePreview = { path: '/assets/Icons/image-gallery.png', index: 0 };
  imagePreviews: string[] = [];
  imageUploadStates: ImageUploadState[] = [];
  errorMessage: string = '';
  
  // Price calculation
  netPrice = 0;
  commissionValue = 0;
  commissionRate = 0.02;
  
  // Cities list
  cities = [
    'Alexandria', 'Aswan', 'Asyut', 'Cairo', 'Damietta',
    'Fayoum', 'Giza', 'Ismailia', 'Luxor', 'Mansoura',
    'Port Said', 'Shubra El-Kheima', 'Suez', 'Tanta', 'Zagazig',
  ];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.userForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      expiryDate: new FormControl(''),
      subcategory: new FormControl('', [Validators.required]),
      condition: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    // Listen to price changes for commission calculation
    this.userForm.get('price')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculateCommission();
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
          // Reset subcategory selection when category changes
          this.userForm.patchValue({ subcategory: '' });
        },
        error: (error) => {
          console.error('Error fetching subcategories:', error);
          this.isLoadingSubcategories = false;
        }
      });
  }

  calculateCommission(): void {
    const price = this.userForm.get('price')?.value;
    if (price && price > 0) {
      this.commissionValue = price * this.commissionRate;
      this.netPrice = price - this.commissionValue;
    } else {
      this.commissionValue = 0;
      this.netPrice = 0;
    }
  }

  onDeleteImage(index: number): void {
    // Remove from upload states
    const uploadState = this.imageUploadStates[index];
    if (uploadState && uploadState.imageId) {
      const imageId = uploadState.imageId; // Store in variable to avoid undefined issues
      
      // Call delete API
      this.postService.deleteImage(imageId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Image deleted successfully:', imageId);
            // Remove from imageIDs array
            const imageIdIndex = this.imageIDs.indexOf(imageId);
            if (imageIdIndex > -1) {
              this.imageIDs.splice(imageIdIndex, 1);
            }
          },
          error: (error) => {
            console.error('Error deleting image:', error);
            // Even if delete fails, remove from local state to maintain UI consistency
            const imageIdIndex = this.imageIDs.indexOf(imageId);
            if (imageIdIndex > -1) {
              this.imageIDs.splice(imageIdIndex, 1);
            }
          }
        });
    }
    
    // Remove from local state
    this.imageUploadStates.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    
    if (this.imagePreviews.length > 0) {
      this.selectedImg = { path: this.imagePreviews[0], index: 0 };
    } else {
      this.selectedImg = { path: '/assets/Icons/image-gallery.png', index: 0 };
    }
  }

  onSelectImage(path: string, index: number): void {
    this.selectedImg = { path, index };
  }

  onFileSelected(event: any): void {
    this.invalid = false;
    const files: FileList = event.target.files;
    this.errorMessage = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Only image files are allowed.';
        return;
      }

      // Create preview
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
        
        // Set as selected image if it's the first one
        if (this.imagePreviews.length === 1) {
          this.selectedImg = { path: preview, index: 0 };
        }
        
        // Upload the image
        this.uploadImage(uploadState, this.imageUploadStates.length - 1);
      };
      reader.readAsDataURL(file);
    }
  }

  private uploadImage(uploadState: ImageUploadState, index: number): void {
    uploadState.isUploading = true;
    uploadState.uploadError = undefined;
    
    this.postService.uploadImage(uploadState.file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          uploadState.isUploading = false;
          uploadState.uploadSuccess = true;
          uploadState.imageId = response.id;
          this.imageIDs.push(response.id);
          console.log('Upload successful:', response);
        },
        error: (error) => {
          console.error('Upload failed:', error);
          uploadState.isUploading = false;
          uploadState.uploadError = 'Failed to upload image. Please try again.';
          uploadState.uploadSuccess = false;
        }
      });
  }

  onSubmit(): void {
    this.invalidSubmit = false;
    this.invalid = false;

    if (!this.userForm.valid) {
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
    const postData: IPost = {
      title: formValue.title,
      condition: formValue.condition,
      category: formValue.category,
      city: formValue.city,
      description: formValue.description,
      price: formValue.price,
      expiryDate: formValue.expiryDate,
      subcategory: formValue.subcategory,
      address: formValue.address,
      imageId: this.imageIDs
    };

    this.isLoading = true;
    this.postService.createPost(postData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          this.isLoading = false;
          // Navigate to home or show success message
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating post:', error);
          this.isLoading = false;
          this.errorMessage = 'Failed to create post. Please try again.';
        }
      });
  }
}
