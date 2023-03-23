import { Component, Input } from '@angular/core';
import { Item } from '../item/item';
//import { Movie } from '../../models/movies';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Item[] = [];
  @Input() title: string = '';
}
