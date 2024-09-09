import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Customer, ITrainBooking } from '../model/train';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  apiUrl:string='https://freeapi.miniprojectideas.com/api/TrainApp/';

  constructor(private http:HttpClient) { }

  getAllStations(){
    return this.http.get(`${this.apiUrl}GetAllStations`);
  }
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


  

getTrainBookings(departureStationId: string, arrivalStationId: string, departureDate: string): Observable<{ result: boolean, data: ITrainBooking[] }> {
  const url = `${this.apiUrl}GetTrainBookings?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}`;
  return this.http.get<{ result: boolean, data: ITrainBooking[] }>(url);
}




}
