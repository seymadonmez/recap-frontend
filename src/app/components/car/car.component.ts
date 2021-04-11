import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  car:Car[]=[];
  cars: Car[] = [];
  carImages:CarImage[]=[];
  carsDetails:CarDetail[]=[];
  dataLoaded=false; 
  imageUrl='https://localhost:44305/';
 

  constructor(private carService:CarService, private rentalService:RentalService, private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else if(params["carId"]){
        this.getCarImagesByCarId(params["carId"])
      }else{
        this.getCarDetails()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.carsDetails=response.data
      this.dataLoaded=true;
      console.log(response)
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
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesById(carId).subscribe(response=>{
     this.carImages=response.data;
     console.log(response);
    })
     
  }

  setCurrentCar(car:CarDetail){
    console.log(car)
    this.carsDetails[0]=car;
  }

  getBack(){
    this.carService.getCars();
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
  
  setCarouselClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    }
    else {
      return "carousel-item";
    }
  }

}
