import {  Component,  OnDestroy,  } from '@angular/core';
import { Subscription } from 'rxjs';
import { IImage } from '../core/interfaces/image.interface';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnDestroy {


  favoriteImages: IImage[]= [];
  favoritesSubscription: Subscription;
  constructor (private imageService: ImageService) {
    this.favoritesSubscription = this.imageService.favorites$.subscribe((favs)=> {
      this.favoriteImages = favs;
    })
  }



  ngOnDestroy(): void {
    if(this.favoritesSubscription)
      this.favoritesSubscription.unsubscribe();
  }
}
