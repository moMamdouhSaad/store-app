import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone:true,
  imports:[CommonModule,FlexLayoutModule,MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

}
