import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';
import { Product } from 'src/app/models/products';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports:[CommonModule, MatCardModule, MatButtonModule, FlexLayoutModule,TruncatePipe,
    MatBadgeModule
],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!:Product

}
