import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-product-card-skeleton',
  templateUrl: './product-card-skeleton.component.html',
  styleUrls: ['./product-card-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[CommonModule, MatCardModule, MatButtonModule, FlexLayoutModule, NgxSkeletonLoaderModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductCardSkeletonComponent {

}
