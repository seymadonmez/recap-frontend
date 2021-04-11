import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {

  rentals: RentalDetail[] = [];
  customers: Customer[];

  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rentBeginDate: Date;
  rentEndDate: Date;

  @Input() car: CarDetail;


 
  constructor(private rentalService: RentalService,

    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  

  getCustomer() {
    this.customerService.getCustomerDetails().subscribe(response => {
      this.customers = response.data;
      console.log(response)
    })
  }

  getDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10)
  }

  createRental() {
    let rental: Rental =
    {
      carId: this.car.carId,
      customerId: parseInt(this.customerId.toString()),
      rentDate: this.rentDate,
      returnDate: this.returnDate
    }
    this.rentalService.add(rental).subscribe(repsonse=>{
      this.toastr.info("Ödeme sayfasına yönlendiriliyorsunuz..");
      this.toastr.success("Kiralama oluşturuldu");
      this.router.navigate(['/payment', JSON.stringify(rental)]);
    },error=>{
      
      this.toastr.error(error.error)
      console.log(rental)
    })
  }

  isLogOK(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      this.toastr.error("Must be Login or Register")
      this.router.navigate(['/homepage'])
      return false;
    }
  }

}
