import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental : RentalDetail;
  cars : CarDetail[]=[];
  customer : Customer;
  getCustomerId : number;
  amountOfPayment : number = 0;
  card : CreditCard;
  cardExist : Boolean = false; 
  
  nameOnTheCard : string;
  cardNumber : string;
  cardCvv : number;
  expirationDate : string;
  constructor(private activatedRoute : ActivatedRoute,
    private carService : CarService,
    private customerService : CustomerService,
    private router : Router,
    private toastrService : ToastrService,
    private rentalService : RentalService,
    private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
        this.getRentalDetails();
      }
    });
  }

  getCustomerDetailById(customerId:number){
    
    this.customerService.getCustomerDetailsByCustomerId(customerId).subscribe((response) =>{
      this.customer = response.data[0];
      console.log(response);
      console.log(this.getCustomerId)
      console.log(customerId)
    });
  }
  getCarDetail(){
    this.carService.getCarDetailById(this.rental.carId).subscribe((response) =>{
      this.cars = response.data;
      this.paymentCalculator();
    });
  }

   getRentalDetails() {
    this.rentalService.getRentalByCarId(this.rental.carId,).subscribe(response=>{
      this.rental=response.data[0]
      
    })
    

  
  }
  paymentCalculator(){
    if(this.rental.returnDate != null){
      var returnDate = new Date(this.rental.returnDate.toString());
      var rentDate = new Date(this.rental.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var numberOfDays = Math.ceil(difference / (1000*3600*24));

      this.amountOfPayment = numberOfDays * this.cars[0].dailyPrice;
      if(this.amountOfPayment <= 0){
        this.router.navigate(['/cars']);
        this.toastrService.error(
          "Araç listesine yönlendiriliyorsunuz.",
          "Hatalı işlem"
        );
      }
    }
  }
  async rentACar(){
    let card : CreditCard = { customerId:this.customer.customerId,
      nameOnTheCard : this.nameOnTheCard,
      cardNumber : this.cardNumber,
      expirationDate : this.expirationDate,
      cvv : this.cardCvv,
    };
    
    this.cardExist = await (await this.isCardExist(card)).succes;
    if(this.cardExist){
      this.card = await this.getCardByCardNumber(this.cardNumber);
      console.log(this.card);
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
      else{
        this.toastrService.success('Arabayı kiraladınız.', 'Işlem başarılı');
        this.toastrService.info('Ana sayfaya yönlendiriliyorsunuz.', 'Bilgilendirme');
        this.router.navigate(['/cars']);
      }
    }
    else{
      this.toastrService.error('Bankanız bilgilerinizi onaylamadı.',"Hata");
    }
  }
  async isCardExist(card : CreditCard){
    return (await this.paymentService.isCardExists(card).toPromise());
  }
  async getCardByCardNumber(cardNumber:string){
    return (await this.paymentService.getCardByNumber(cardNumber).toPromise()).data[0];
  }
  updateCard(card:CreditCard){
    this.paymentService.updateCard(card);
  }
  cardNumberSplit() {
    document.getElementById("card-number").innerHTML = this.cardNumber.toString().replace(/\d{4}(?=.)/g, '$& ');

  }
}
