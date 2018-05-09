import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../services/model/Category';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../services/model/Product';
import { ProductService } from '../../services/product.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public categories$: Observable<Category[]>;
  product: FormGroup;
  constructor(private categoryService: CategoryService, private productService: ProductService, private fb: FormBuilder) { }



  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.product = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.min(0), Validators.required]],
      category: ['', Validators.required],
      url: ['', Validators.required]
    });

  }

  createProduct(): void {
    this.productService.create(this.product.value);
  }

}
