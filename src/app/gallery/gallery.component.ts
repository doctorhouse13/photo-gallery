import { AfterViewChecked , HostListener,ElementRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../image.service';

import { IImage } from '../core/interfaces/image.interface';
import { Subscription } from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit,AfterViewChecked, OnDestroy {


  @ViewChild('spinner', {static: false}) spinner: MatProgressSpinner;
  isSpinnerScrolledIntoView: boolean = false;
  loading: boolean = false;
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    this.checkScrollSpinner();
    
  }

  images: IImage[]= [];
  imagesSubscription: Subscription ;
  count: number = -1;
  constructor (private imageService: ImageService) {
    
    this.imagesSubscription = this.imageService.loadedImages$.subscribe((res)=> {
      this.images = res.data;
      this.count = res.count;
      this.loading = false;
    });
    //PUT THIS IN INFINITE SCROLL COMPONENT
    if(this.images.length == 0)
      this.loadNewImages();
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.checkScrollSpinner();
    
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

  checkScrollSpinner() {
    
    if (this.spinner){
      const rect = this.spinner._elementRef.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      
      const bottomShown = rect.bottom-60 <= window.innerHeight;
      this.isSpinnerScrolledIntoView = topShown && bottomShown;
      // console.log(topShown, bottomShown, rect.bottom, window.innerHeight);
      
      if(this.isSpinnerScrolledIntoView && !this.loading) {
        this.loading = true;
        this.loadNewImages();
        this.isSpinnerScrolledIntoView=false;
      }
      
    }
  }
  
}
