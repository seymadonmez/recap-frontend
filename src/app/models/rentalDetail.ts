export interface RentalDetail{
    id:number;
    carId:number;
    userId:number;
    userName:string;
    carName:string;
    brandName:string;
    colorName:string;
    companyName:string;
    modelYear:number;
    rentDate?:Date;
    returnDate:Date;
}
