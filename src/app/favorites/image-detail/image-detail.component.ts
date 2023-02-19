import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IImage } from 'src/app/core/interfaces/image.interface';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnDestroy {

  id: number | null = null;
  image: IImage | undefined = undefined;
  routeSubscription: Subscription;

  constructor(route: ActivatedRoute, private  imageService: ImageService) {
    this.routeSubscription = route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.image = imageService.favoriteImages.find((img)=> img.id == this.id );
      }
    );
  }

  removeFromFavorites() {
    if(this.image)
      this.imageService.removeFromFavorites(this.image);
  }
  
  ngOnDestroy(): void {
    if(this.routeSubscription)
      this.routeSubscription.unsubscribe();
  }
}
