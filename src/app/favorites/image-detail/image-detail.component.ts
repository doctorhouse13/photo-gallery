import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IImage } from 'src/app/core/interfaces/image.interface';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent {

  id: number | null = null;
  image: IImage | undefined = undefined;
  constructor(route: ActivatedRoute, private  imageService: ImageService) {
    route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.image = imageService.images.find((img)=> img.id == this.id );
      }
    );
  }

  removeFromFavorites() {
    if(this.image)
      this.imageService.removeFromFavorites(this.image);
  }
}
