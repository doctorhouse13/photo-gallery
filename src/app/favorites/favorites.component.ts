import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IImage } from '../core/interfaces/image.interface';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {


  favoriteImages: IImage[]= [];

  constructor (private imageService: ImageService) {
    imageService.favorites$.subscribe((favs)=> {
      this.favoriteImages = favs;
    })
  }

  ngOnInit(): void {
    
  }
}
