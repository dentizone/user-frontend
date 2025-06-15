import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule,DatePicker],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen=false
  openSideBar(){
    this.isSidebarOpen=!this.isSidebarOpen;
    
  }
  //Expiry date

  fromDate:Date=new Date();
  toDate:Date=new Date();
  //price
  minPrice=0;
  maxPrice=100;
  desiredPrice=100;
  onChangePriceRange(e:any){
    this.desiredPrice=e.target.value;
    console.log(this.desiredPrice);
  }


  //categories
  activeCategory='Category1'
  categories=[
    {id:'123456789',
      name:'Category1',
      icon:''
    },
    {id:'123456789',
      name:'Category2',
      icon:''
    },
    {id:'123456789',
      name:'Category3',
      icon:''
    },
    {id:'123456789',
      name:'Category4',
      icon:''
    }
  ]
  onSelectCategory(name:string){
    this.activeCategory=name
  }
}
