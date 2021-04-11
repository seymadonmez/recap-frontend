import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44305/api/';

  constructor(private httpClient:HttpClient) { }

  getCustomerDetails(): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+'customers/getcustomerdetails';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetailsByUserId(userId:number): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+'customers/getcustomerdetailsbyuserid?userId'+userId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetailsByCustomerId(customerId:number): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+'customers/getcustomerdetailsbycustomerid?customerId'+customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  add(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/add";
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update";
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }

  delete(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/delete";
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }
}
