import { CarImage } from "./carImage";

export interface Car{
    id:number;
    name:string;
    brandId:number;
    brandName:string;
    colorId:number;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    carImage:CarImage[];

}