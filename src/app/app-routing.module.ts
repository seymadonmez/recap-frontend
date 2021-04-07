import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  
  {path:"cars/details/:carId",component:CarComponent},
  {path:"cars/brands/:brandId",component:CarComponent},
  {path:"cars/colors/:colorId", component:CarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
