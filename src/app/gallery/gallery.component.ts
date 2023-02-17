import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';

import { IImage } from '../core/interfaces/image.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  images: IImage[]= [];
  imagesSubscription: Subscription ;
  count: number = -1;
  constructor (private imageService: ImageService) {
    
    this.imagesSubscription = this.imageService.loadedImages$.subscribe((res)=> {
      this.images = res.data;
      this.count = res.count;
      console.log(this.count == this.images.length);
    });
    //PUT THIS IN INFINITE SCROLL COMPONENT
    this.loadNewImages();
  }

  ngOnInit(): void {

    
  }
 
  ngOnDestroy(): void {
    if(this.imagesSubscription)
      this.imagesSubscription.unsubscribe();
    
  }

  addToFavorites(image : IImage) {
    this.imageService.setFavorite(image);
  }

  loadNewImages() {
    
    this.imageService.loadImages();
    
  }
  
}
