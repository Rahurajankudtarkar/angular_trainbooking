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

    //check avaibility
   
    export interface ITrainBooking {
      trainId: number;
      trainNo: number;
      trainName: string;
      departureStationName: string;
      arrivalStationName: string;
      arrivalTime: string;
      departureTime: string;
      totalSeats: number;
      departureDate: string;
      bookedSeats: number;
      totalAvailableSeats: number;
    }
    
    //check and convert station name to id
    export interface Station {
      stationID: number;
      stationName: string;
      stationCode: string;
    }


    export interface Train {
      trainId: number;
      trainNo: number;
      trainName: string;
      departureStationId: number;
      arrivalStationId: number;
      departureTime: string;
      arrivalTime: string;
      totalSeats: number;
      departureDate: string;
    }
    





   