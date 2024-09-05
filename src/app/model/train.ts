export interface IStation{
    
      stationID: number;
      stationName: string;
      stationCode: string;
}
export class Search {
      fromStationId:number;
      toStationId:number;
      dateOfTravel:string;
      constructor(){
           this.fromStationId=0;
           this.toStationId=0;
           this.dateOfTravel=''; 
      }
}

export interface ITrain {
      trainId: number
      trainNo: number
      trainName: string
      departureStationName: string
      arrivalStationName: string
      arrivalTime: string
      departureTime: string
      totalSeats: number
      departureDate: string
      bookedSeats: number
    }

    export class Customer {
      passengerID: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
      constructor(){
            this.passengerID=0;
            this.email='';
            this.firstName='';
            this.lastName='';
            this.password='';
            this.phone='';
      }
    }

    export interface APIResponse {
      message: number;
      result: boolean;
      data: any;
    }





   