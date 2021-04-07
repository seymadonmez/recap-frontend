import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsDetails:CarDetail[]=[];
  
  dataLoaded=false; 
  title = "Car Detail List";
 

  constructor(private carService:CarService, 
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCarDetails()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.carsDetails=response.data
      this.dataLoaded=true;
    })
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(response=>{
      this.carsDetails=response.data
      this.dataLoaded=true;
    })
    
  }


  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carsDetails=response.data
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByBrand(colorId).subscribe(response=>{
      this.carsDetails=response.data
      this.dataLoaded=true;
    })
  }

}
