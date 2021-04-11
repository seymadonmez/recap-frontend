import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44305/api/';
  constructor(private httpClient:HttpClient) { }


  getAllRental(): Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+'rentals/getrentaldetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getByRentalId(rentalId:number): Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+'rentals/getrentalbyid?rentalid'+rentalId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetailsByUser(userId:number):Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"rentals/getrentaldetailsbyuserid?userid="+userId
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalByCarId(carId:number) : Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl+"rentals/getrentaldetailsbycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'rentals/add',rental);
  }

  checkCarIsRented(carId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl+"rentals/checkcarisrented?carid="+carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }


  
}
