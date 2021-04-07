import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getAllRental();
  }
  getAllRental() {
    this.rentalService.getAllRental().subscribe((response) => {
      this.rentalDetails = response.data;
    });
  }
}
