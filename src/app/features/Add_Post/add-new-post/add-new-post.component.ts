import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { QuillEditorComponent } from 'ngx-quill';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import "quill/dist/quill.core.css";

interface img{
  path:string;
  index:number
}
interface Icategory{
  iconUrl: string
  id: string
  name: string
}
@Component({
  selector: 'app-add-new-post',
  imports: [CommonModule,ReactiveFormsModule,DatePicker,FormsModule,QuillEditorComponent],
  templateUrl: './add-new-post.component.html',
  styleUrl: './add-new-post.component.css'
})

export class AddNewPostComponent implements OnInit{
  categories:Icategory[]=[]
  subCategories:Icategory[]=[]
  userForm!: FormGroup;
  imageID:string[]=[];

  ngOnInit(): void {
    fetch('https://apit.gitnasr.com/api/Catalog/categories', {
  headers: {
    Authorization: 'Bearer YOUR_SECRET_TOKEN'
  }
}).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then((data: Icategory[]) => {
      this.categories = data;
      console.log('Fetched categories:', this.categories);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });


    this.userForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      expiryDate:new FormControl(''),
      subcategory:new FormControl('', [Validators.required]),
      condition:new FormControl('', [Validators.required]),
      price:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      address:new FormControl('', [Validators.required])
    });
    }

    onSelectCategory(e:any){
      fetch(`https://apit.gitnasr.com/api/Catalog/categories/${this.userForm.value.category}/subcategories`, {
        headers: {
          Authorization: 'Bearer YOUR_SECRET_TOKEN'
        }
      }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then((data: Icategory[]) => {
      this.subCategories = data;

      console.log('Fetched subCategories:', this.subCategories);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
    // console.log('Fetched categories:', e.target.value);
    // console.log('Fetched categories:', e.target.id);
    // console.log('Fetched categories:', this.category);
    console.log(this.userForm);
    }
    onSelectSubcategory(){
      console.log('selected category: ', this.category);
      console.log('selected subcategory: ', this.subcategory);
    }
  userPost={}
  invalid=false
  onSubmit(){
     if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
    if(this.imagePreviews.length==0){
      this.invalid=true
    }
    this.userPost={
      title:this.title,
      condition:this.condition,
      category:this.category,
      city:this.city,
      description:this.description,
      price:this.price,
      expiryDate:this.ExpiryDate,
      subcategory:this.subcategory,
      address:this.address,
      imageId:this.imageID
    }
  }
  cities = [
    'Alexandria',
    'Aswan',
    'Asyut',
    'Cairo',
    'Damietta',
    'Fayoum',
    'Giza',
    'Ismailia',
    'Luxor',
    'Mansoura',
    'Port Said',
    'Shubra El-Kheima',
    'Suez',
    'Tanta',
    'Zagazig',
  ];
  title:string=''
  hasExpiryDate=false
  condition:string='Choose a Condition'
  category:Icategory={name:'',id:'',iconUrl:''}
  subcategory:Icategory={name:'',id:'',iconUrl:''}
  city:string='Choose Your City'
  address:string=''
  price:string=''
  netPrice=0;
  commissionValue=0;
  commissionRate=0.02;
  description=''
  ExpiryDate:Date=new Date();

  calculateCom(e:any){
    this.commissionValue = (+this.userForm.value.price) * this.commissionRate;
    this.netPrice = (+this.userForm.value.price) - this.commissionValue;
   
  }

  selectedImages: File[] = [];
  selectedImg:img={path:'',index:0};
  imagePreviews: string[] = [];
  errorMessage: string = '';

  onDelete(index:number){
    this.imagePreviews.splice(index, 1);
    this.imageID.splice(index,1);
    if(this.imagePreviews.length>0){
    this.selectedImg.path=this.imagePreviews[0];
    this.selectedImg.index=0;}
    else{
      this.selectedImg.path="/assets/Icons/image-gallery.png";
      this.selectedImg.index=0;
    }
  }
  onSelectImage(path:string,index:number){
    this.selectedImg={path,index};
  }
  onFileSelected(event: any): void {
    this.invalid=false;
    const files: FileList = event.target.files;
    this.errorMessage = '';
    this.selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Only image files are allowed.';
        return;
      }

      this.selectedImages.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
       this.selectedImg.path=this.imagePreviews[0]
    }
    if (this.selectedImages.length > 0) {
    const imageToUpload = this.selectedImages[0];
    this.uploadImage(imageToUpload);
  }

  }
  uploadImage(file: File): void {
  const formData = new FormData();
  formData.append('file', file);  
  fetch('https://apit.gitnasr.com/api/Upload/image', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer YOUR_SECRET_TOKEN'},
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Upload successful:', data);
    this.imageID.push(data.id);
    console.log('Upload successful:', this.imageID);
  })
  .catch(error => {
    console.error('Upload failed:', error);
  });
}

}
