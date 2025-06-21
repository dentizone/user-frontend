import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavsService } from '../../favorites/favs.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fav-list',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css'
})
export class FavListComponent implements OnInit{
  favlist:any=[]
  constructor(private favService:FavsService){}
  ngOnInit(): void {
    this.loadFav()
  }
  onclick(){

  }
  loadFav(){
    this.favService.getAllFav().subscribe({
      next:(data)=>{this.favlist=data,console.log(this.favlist)},
      error: (err)=>console.log(err)
    })
  }
  removeProduct(id:string){
    this.favService.removeFavByID(id).subscribe({
      next:()=>console.log("Data Removed Successfuly"),
      error:()=>console.log("error")
    })
    this.loadFav()
  }
}
