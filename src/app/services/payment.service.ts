import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44305/api/';

  constructor(private httpClient:HttpClient) { }

  isCardExists(creditCard : CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditCards/checkcreditcardexists";
    console.log(creditCard);
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  };
  getCardByNumber(cardNumber : string) : Observable<ListResponseModel<CreditCard>>{
      let newPath = this.apiUrl + "creditCards/getbycardnumber?cardnumber=" + cardNumber;
      return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
  updateCard(card:CreditCard){
    let newPath = this.apiUrl + "creditCards/update";
    this.httpClient.put(newPath,card);
  }
}
