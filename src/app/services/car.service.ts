import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44305/api/';
  constructor(private httpClient: HttpClient) { }


  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getall"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);

  }

  getCarDetails(){
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath=this.apiUrl+"cars/getcarsbybrandid?brandid="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);

  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcarsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

}
