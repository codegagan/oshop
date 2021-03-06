import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/model/Category';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../../shared/model/Product';
import { ProductService } from '../../../shared/services/product.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy{

  public categories$: Observable<Category[]>;
  product: FormGroup;
  id: string;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
  private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.product = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.min(0), Validators.required]],
      category: ['', Validators.required],
      url: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
      if (this.id) {
        this.productService.get(this.id).take(1).subscribe(p => this.product.patchValue(p));
      }
    });
  }

  createProduct(): void {
    if (this.id) {
      this.productService.update(this.id, this.product.value);
    } else {
      this.productService.create(this.product.value);
    }
    this.navigate();
  }

  delete() {
    if (confirm('Are you sure you want to delete this Product ?')) {
      this.productService.delete(this.id);
      this.navigate();
    }
  }

  private navigate() {
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy() {

  }

}
