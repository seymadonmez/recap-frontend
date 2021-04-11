import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {


  car: CarDetail;
  carDetails:CarDetail[]=[];
  dataLoaded = false;
  images:CarImage[]=[];
  imageUrl='https://localhost:44305/';
  carImages:CarImage[]=[];
  isCarRentable:boolean;
  currentCar:CarDetail;

  constructor(private carService:CarService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsById(params["carId"]);
        this.getImagesById(params["carId"]);
        this.checkCarRentable(params['carId']);;
      }else if(params["carId"]){
        this.getImagesById(params["carId"]);
      }
    })
  }

  

  getCarsById(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{
      this.car=response.data[0];
      this.dataLoaded=true;
     
    })
  }
  getImagesById(carId:number){
    this.carImageService.getCarImagesById(carId).subscribe(response=>{
      this.images=response.data;
      this.dataLoaded=true;
      console.log("image metot bitti")
    })
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  getBack(){
    this.carService.getCars();
    this.dataLoaded=true
  }

  addToCart(car:CarDetail){
    this.toastrService.success("Kiralandı",car.carName)

  }

  checkCarRentable(carId:number){
    this.rentalService.checkCarIsRented(carId).subscribe((response) => {
      this.isCarRentable = response.succes;     
      this.dataLoaded=true
      console.log(this.isCarRentable)  
      console.log(response)     
    })
  }

  setCurrentCar(carId:number){
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.currentCar = response.data[0];
      console.log(this.currentCar)
    })
  }
  
}

 

