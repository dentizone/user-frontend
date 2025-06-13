import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../categories.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-categories',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  
  categories:Category[]=[]
  isLoading:boolean=true;

  constructor(private _categoriesService:CategoriesService){}
  
  ngOnInit(): void {
    this._categoriesService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.isLoading = false; 
    }});
  }

  // categories: Category[] = [
  //   {
  //     name: 'Dental Lab / Materials',
  //     count: 15,
  //     icon: '/assets/Icons/lab.png',
  //   },
  //   {
  //     name: 'Radiology',
  //     count: 10,
  //     icon: '/assets/Icons/radiology.png',
  //   },
  //   {
  //     name: 'Penetrative Dentistry',
  //     count: 17,
  //     icon: '/assets/Icons/penetrative.png',
  //   },
  //   {
  //     name: 'Pediatric Dentistry',
  //     count: 7,
  //     icon: '/assets/Icons/pediatric.png',
  //   },
  //   {
  //     name: 'Dental Surgery',
  //     count: 11,
  //     icon: '/assets/Icons/surgery.png',
  //   },
  //   {
  //     name: 'Periodontics',
  //     count: 23,
  //     icon: '/assets/Icons/periodontics.png',
  //   },
  //   {
  //     name: 'Operative / Restorative',
  //     count: 13,
  //     icon: '/assets/Icons/restorative.png',
  //   },
  //   {
  //     name: 'Orthodontics',
  //     count: 22,
  //     icon: '/assets/Icons/orthodontics.png',
  //   },
  //   {
  //     name: 'Endodontics',
  //     count: 19,
  //     icon: '/assets/Icons/endodontics.png',
  //   },
  //   {
  //     name: 'Prosthodontics',
  //     count: 24,
  //     icon: '/assets/Icons/prosthodontics.png',
  //   },
  //   {
  //     name: 'General / Miscellaneous',
  //     count: 32,
  //     icon: '/assets/Icons/misc.png',
  //   },
  //   {
  //     name: 'All Categories',
  //     count: 193,
  //     icon: '/assets/Icons/all.png',
  //   },
  // ];

}
