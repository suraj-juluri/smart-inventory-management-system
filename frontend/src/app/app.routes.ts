import { Routes } from '@angular/router';
import { Notifications } from './notifications/notifications';

import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { AddProduct } from './add-product/add-product';
import { UpdateStock } from './update-stock/update-stock';
import { EditProduct } from './edit-product/edit-product';
import { LowStock } from './low-stock/low-stock';
import { OutOfStock } from './out-of-stock/out-of-stock';


export const routes: Routes = [

  {
    path: '',
    component: Dashboard
  },

  {
    path: 'products',
    component: Products
  },

  {
    path: 'add-product',
    component: AddProduct
  },

  {
    path: 'update-stock',
    component: UpdateStock
  },

  {
    path: 'edit-product/:id',
    component: EditProduct
  },

  {
  path: 'low-stock',
  component: LowStock
  },
  {
  path: 'out-of-stock',
  component: OutOfStock
  },
  { path: 'notifications', component: Notifications }

];