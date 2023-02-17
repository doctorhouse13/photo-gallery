import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { ImageDetailComponent } from './favorites/image-detail/image-detail.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: ImageDetailComponent },
  { path: '',   redirectTo: '/gallery', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
