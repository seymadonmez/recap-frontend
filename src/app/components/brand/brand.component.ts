import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  dataLoaded=false;
  currentBrand:Brand={brandId:1,brandName:" "};
  filterText=""
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    console.log("Api request başladı")
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
      this.dataLoaded=true;
    })
    console.log("Metod bitti");
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getCurrentAllBrandClass(){
    if(this.currentBrand.brandId==0){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  
  nullCurrentBrand(){
    this.currentBrand={brandId:0,brandName:""};;
  }

  

}
