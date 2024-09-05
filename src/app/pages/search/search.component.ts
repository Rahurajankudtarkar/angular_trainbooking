import { Component, Inject, inject,OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse, Customer, IStation, ITrain, Search } from '../../model/train';
import { TrainService } from '../../service/train.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  tarinerService =inject(TrainService)
  searchdata:Search =new Search();
  trainList:ITrain[]=[];
  stationList:IStation[]=[];
  selectedTrain?: ITrain;
  passenger: any ={
      
      "passengerName": "",
      "age": ""
    
  }
  // to add passenger into arraylist from add button
  passengerList: any[]=[];
  //logged user data
  loggedUserData: Customer =new Customer();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only access localStorage if the platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      const localData = localStorage.getItem('trainApp');
      if (localData != null) {
        this.loggedUserData = JSON.parse(localData);
      }
    }

    this.activatedRoute.params.subscribe((res: any) => {
      debugger;
      this.searchdata.fromStationId = res.fromStationId;
      this.searchdata.toStationId = res.toStationId;
      this.searchdata.dateOfTravel = res.dateOfTravel;
      this.getSearchTrains();
    });
  }

  loadAllStation(){
    this.tarinerService.getAllStations().subscribe((res:any)=>{
      this.stationList=res.data;
    })
  }

  ngOnInit(): void {
    this.loadAllStation();
    
}

    getSearchTrains(){
      this.tarinerService.getTrainsSerach(this.searchdata.fromStationId,this.searchdata.toStationId,this.searchdata.dateOfTravel).subscribe((res:any)=>{
        debugger;
        this.trainList=res.data;
      })
    }

    openBookingModel(train: ITrain) {

      if (!this.loggedUserData || !this.loggedUserData.passengerID) {
        alert('Please log in to book tickets.');
        // Optionally, you can navigate the user to the login page if needed.
        // this.router.navigate(['/login']);
        return; // Stop further execution if the user is not logged in
      }
      this.selectedTrain=train;
      const model = document.getElementById("myBookModal");
      if (model != null) {
        model.style.display = 'block';
      }
    }

    closeBookingModel() {
      const model = document.getElementById("myBookModal");
      if (model != null) {
        model.style.display = 'none';
      }
    }
    
    addPassenger(){
      //to change the reference because if we change name it will change other
      const strObj=JSON.stringify(this.passenger);
      const parseObj=JSON.parse(strObj);
      this.passengerList.push(parseObj);
    }

    bookTicket(){
      const bookingObj={
        "bookingId": 0,
        "trainId": this.selectedTrain?.trainId,
        "passengerId": this.loggedUserData.passengerID,
        "travelDate": this.searchdata.dateOfTravel,
        "bookingDate": new Date(),
        "totalSeats": 0,
        "TrainAppBookingPassengers":[] as any
      };
      bookingObj.TrainAppBookingPassengers=this.passengerList;
      bookingObj.totalSeats=this.passengerList.length;
      this.tarinerService.bookTrain(bookingObj).subscribe((res: APIResponse)=>{
        if(res.result){
          alert("Ticket Booked Success")
        }else{
          alert(res.message)
        }
      })
    }
}
