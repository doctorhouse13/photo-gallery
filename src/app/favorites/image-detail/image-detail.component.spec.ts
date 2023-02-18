import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ImageDetailComponent } from './image-detail.component';

describe('ImageDetailComponent', () => {
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      imports: [AppRoutingModule, MatSnackBarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
