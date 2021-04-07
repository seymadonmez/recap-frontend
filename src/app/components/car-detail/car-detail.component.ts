import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetails:CarDetail[]=[];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data;
    })
  }
}
