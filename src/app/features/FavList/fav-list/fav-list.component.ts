import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavsService } from '../../favorites/favs.service';

@Component({
  selector: 'app-fav-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css',
})
export class FavListComponent implements OnInit {
  favlist: any = [];
  constructor(private favService: FavsService) {}
  ngOnInit(): void {
    this.loadFav();
  }

  loadFav() {
    this.favService.getAllFav().subscribe({
      next: (data) => {
        this.favlist = data;
      },
      error: (err) => console.log(err),
    });
  }
  removeProduct(id: string, index: number) {
    this.favService.removeFavByID(id).subscribe({
      next: () => {
        this.favlist.splice(index, 1);
        console.log('Data Removed Successfully');
      },
      error: (err) => {
        console.log('Error removing favorite:', err);
      },
    });
    //this.loadFav()
  }
}
