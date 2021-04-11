import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  car:CarDetail;
  cars:CarDetail[]=[]
  rentalDetails: RentalDetail[] = [];
 
  constructor(private rentalService: RentalService,private carService:CarService,
    private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails() {
    this.rentalService.getAllRental().subscribe((response) => {
      this.rentalDetails = response.data;
    });
  }
  getRetalById(rentalId:number){
    this.rentalService.getRentalDetailsByUser(rentalId).subscribe(response => {
     // console.log(response.data)
      this.rentalDetails = response.data;
    })
  }

  getCarsById(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{     
      this.cars=response.data;    
    })
  }

  getRentMinDate(){

    var today  = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  getReturnMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }

  
  
}
