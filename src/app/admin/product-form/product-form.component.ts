import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../services/model/Category';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../services/model/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public categories$: Observable<Category[]>;
  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  createProduct(product: Product): void {
    // console.log(product);
    this.productService.create(product);
  }

}
