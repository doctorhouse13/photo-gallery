import { Injectable } from '@angular/core';
import { IImage } from './core/interfaces/image.interface';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  favoriteImages: IImage[] =[];
  loadedImages: {data: IImage[], count: number} = {data : [], count: 0};
  favorites$ = new BehaviorSubject(this.favoriteImages);
  loadedImages$ = new BehaviorSubject(this.loadedImages);
  constructor( private _snackBar: MatSnackBar) { 
     this.favoriteImages = this.getFavorites();
     this.favorites$.next(this.favoriteImages);
  }
  

  images: IImage[] =[
    {"id":1,  "url":"assets/18-800x800.jpg"},
    {"id":2, "url":"assets/42-800x800.jpg"},
    {"id":3, "url":"assets/145-800x800.jpg"},
    {"id":4,  "url":"assets/276-800x800.jpg"},
    {"id":5, "url":"assets/297-800x800.jpg"},
    {"id":6, "url":"assets/362-800x800.jpg"},
    {"id":7,  "url":"assets/481-800x800.jpg"},
    {"id":8,  "url":"assets/486-800x800.jpg"},
    {"id":9,  "url":"assets/603-800x800.jpg"},
    {"id":10,  "url":"assets/626-800x800.jpg"},
    {"id":11,  "url":"assets/757-800x800.jpg"},
    {"id":12,  "url":"assets/833-800x800.jpg"},
    {"id":13,  "url":"assets/896-800x800.jpg"},
    {"id":14,  "url":"assets/929-800x800.jpg"},
    {"id":15,  "url":"assets/995-800x800.jpg"},
    {"id":16,  "url":"assets/1062-800x800.jpg"},
    {"id":17,  "url":"assets/1074-800x800.jpg"},
  ]

  getFavorites() : IImage[]  {
    let favsString : string | null= localStorage.getItem('favs' );
    let favs: IImage[] =[];
    if(favsString != null)
      favs = JSON.parse(favsString) ;
    return favs;
  }
  
  setFavorite(image: IImage) {
    let favs: IImage[] = this.getFavorites();
    if (favs.filter(e => e.url == image.url).length == 0) {
    // if(!favs.includes(image)) {
      favs.push(image);
      let favsString: string = JSON.stringify(favs);
      localStorage.setItem('favs', favsString );
      this.favoriteImages = favs;
      this.favorites$.next(this.favoriteImages);
      this._snackBar.open('Added To Favorites', undefined, {duration:500});
    }
    else {
      this._snackBar.open('Already included',  undefined, {duration:500});
    }
  }

  removeFromFavorites(image: IImage) {
    let favs: IImage[] = this.getFavorites();
    if (favs.filter(e => e.url == image.url).length > 0) {
      let indexToRemove = favs.findIndex((el)=> el.id == image.id);
      if(indexToRemove >= 0 )
      {
        favs.splice(indexToRemove,1);
        let favsString = JSON.stringify(favs);
        localStorage.setItem('favs', favsString );
        this.favoriteImages = favs;
        this.favorites$.next(this.favoriteImages);
      }
    }
  }
  
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

  loadImages() {
    setTimeout(()=> {
      this.getImages(3);
    }, this.randomIntFromInterval(200,300));
  }

  getImages(numberOfImages: number): void  {
    let numberToLoad = numberOfImages;
    if(this.images.length - this.loadedImages.data.length < numberOfImages )
    {
      numberToLoad = this.images.length - this.loadedImages.data.length;
    }
    
    let nonLoadedImages = [...this.images];
    this.loadedImages.data.forEach(element => {
      let indexToRemove = nonLoadedImages.findIndex((el)=> el.id == element.id);
      if(indexToRemove >= 0)
        nonLoadedImages.splice(indexToRemove, 1);
    });
    
    let imagesToLoad = this.getRandomElementsFromArray(numberToLoad, nonLoadedImages);
    imagesToLoad.forEach((el)=> this.loadedImages.data.push(el));
    this.loadedImages.count = this.images.length;
    this.loadedImages$.next(this.loadedImages);


  }

  getRandomElementsFromArray(numberToGet: number, theArray: IImage[]): IImage[]
  {
    let res: IImage[]=[];
    for(let i=0;i<numberToGet; i++)
    {
      let index = this.randomIntFromInterval(0,theArray.length-1);
      res.push(theArray[index]);
      theArray.splice(index,1);
    }
    return res;
  }
  
}
