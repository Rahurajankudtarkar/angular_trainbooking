import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Customer, ITrainBooking, Station } from '../model/train';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  apiUrl:string='https://freeapi.miniprojectideas.com/api/TrainApp/';

  constructor(private http:HttpClient) { }

  // getAllStations(){
  //   return this.http.get(`${this.apiUrl}GetAllStations`);
  // }
  getTrainsSerach(from:number,to:number,date:string){
    return this.http.get(`${this.apiUrl}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`);
  }

  createNewCustomer(obj:Customer){
    return this.http.post<APIResponse>(`${this.apiUrl}AddUpdatePassengers`,obj)
  }

  onLogin(obj:any){
    return this.http.post<APIResponse>(`${this.apiUrl}Login`,obj)
  }

  bookTrain(obj:any){
    return this.http.post<APIResponse>(`${this.apiUrl}BookTrain`,obj)
  }

  // train.service.ts
// train.service.ts
// check avibility


    //check and convert station name to id

getTrainBookings(departureStationId: string, arrivalStationId: string, departureDate: string): Observable<{ result: boolean, data: ITrainBooking[] }> {
  const url = `${this.apiUrl}GetTrainBookings?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}`;
  return this.http.get<{ result: boolean, data: ITrainBooking[] }>(url);
}
// getTrainBookings(departureStationId: string, arrivalStationId: string, departureDate: string): Observable<{ result: boolean, data: any[] }> {
//   const url = `${this.apiUrl}GetTrainBookings?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}`;
//   return this.http.get<{ result: boolean, data: any[] }>(url);
// }

    //check and convert station name to id
stationWithId: Station[] = [];

getAllStations(): Observable<{ result: boolean; data: Station[] }> {
  const url = `${this.apiUrl}GetAllStations`;
  return this.http.get<{ result: boolean; data: Station[] }>(url);
}
setStationWithId(stations: Station[]): void {
  this.stationWithId = stations;
}

// Get the station ID by its name
getStationIdByName(stationName: string): number | undefined {
  const station = this.stationWithId.find(s => s.stationName.toLowerCase() === stationName.toLowerCase());
  return station?.stationID;
}

////admin 
addNewTrain(trainData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}AddNewTrain`, trainData);
}

}
