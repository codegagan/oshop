import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../services/model/Product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  // products$: Observable<Product[]>;
  products: Product[];
  filteredProducts: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
      this.productService.getAll().subscribe(products => {
        this.filteredProducts = this.products = products;

        // Initialize table
        this.tableResource = new DataTableResource(this.products);
        this.tableResource.count().then(count => this.itemCount = count);

        this.tableResource.query({offset: 0}).then(p => this.items = p);
      });
  }

  filter(query: string): void {
    this.filteredProducts = query ? this.products.filter(p =>
      p.title.toUpperCase().includes(query.toUpperCase())) :
      this.products;
  }

  reload(params) {
    if (this.tableResource) {
      this.tableResource.query(params).then(p => this.items = p);
    }
  }

}
