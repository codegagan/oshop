import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/model/Category';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input() category: string;

  categories$: Observable<Category[]>;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

}
