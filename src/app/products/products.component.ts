import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/model/Product';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category.service';
import { Category } from '../services/model/Category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.route.queryParams.subscribe(params => {
        this.category = params.category;
          this.filteredProducts = this.category ?
          this.products.filter(value => value.category.toString() === this.category) :
          this.products;
      });
    });
  }
}
