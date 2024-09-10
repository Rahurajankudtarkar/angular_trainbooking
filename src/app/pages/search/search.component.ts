import { Component, Inject, inject,OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse, Customer, IStation, ITrain, ITrainBooking,  Search } from '../../model/train';
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
    //check avaibility
    this.searchdatas.dateOfTravel = '2024-09-09';
      //check and convert station name to id
    this.tarinerService.getAllStations().subscribe((response) => {
      if (response.result) {
        this.tarinerService.setStationWithId(response.data); // Save station data
      }
    });
    
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
      }``
    }
    
    // addPassenger(){
    //   //to change the reference because if we change name it will change other
    //   const strObj=JSON.stringify(this.passenger);
    //   const parseObj=JSON.parse(strObj);
    //   this.passengerList.push(parseObj);
    // }
    addPassenger() {
      // Validate that passengerName is not empty and age is a valid positive number
      if (!this.passenger.passengerName || this.passenger.passengerName.trim() === '') {
        alert('Passenger Name is required');
        return;
      }
      
      if (!this.passenger.age || isNaN(this.passenger.age) || +this.passenger.age <= 0) {
        alert('Valid Age is required');
        return;
      }
    
      // Change the reference to avoid modifying the original object when changing the fields
      const strObj = JSON.stringify(this.passenger);
      const parseObj = JSON.parse(strObj);
      
      // Add the passenger to the list
      this.passengerList.push(parseObj);
    
      // Clear the input fields after adding the passenger
      this.passenger.passengerName = '';
      this.passenger.age = '';
    }
    
    removePassenger(index: number) {
      this.passengerList.splice(index, 1); // Removes the passenger at the specified index
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

    ///check avaibility
  bookings: ITrainBooking[] = [];
  selectedTrainSeats: number = 0;
  searchdatas = {
    dateOfTravel: ''
  };
    
    // In your component.ts file
    checkAvailability(trainId: number, departureStationId: string, arrivalStationId: string, departureDate: string) {
       console.log(trainId,departureStationId,arrivalStationId,departureDate);
      // this.openchecking();
      // this.tarinerService.getTrainBookings('2', '20', '2024-09-09'  ).subscribe((response: any) => {
      //   const selectedTrain = response.data.find((train: { trainId: number; }) => train.trainId === trainId);
        
      //   if (selectedTrain) {
      //     this.selectedTrainSeats = selectedTrain.totalAvailableSeats;
      //     // this.openchecking();// Open modal to display seats availability
      //   }
      // });
      //check staion and conert station name to id
      const departureStationIds = this.tarinerService.getStationIdByName(departureStationId);
      const arrivalStationIds = this.tarinerService.getStationIdByName(arrivalStationId);
      console.log(trainId,departureStationIds,arrivalStationIds,departureDate);
  
      if (departureStationIds && arrivalStationIds) {
        // Ensure departureDate is in 'YYYY-MM-DD' format
        const formattedDate ='2024-09-09';
        console.log(trainId,departureStationIds,arrivalStationIds,formattedDate);
  
        this.tarinerService.getTrainBookings(departureStationIds.toString(), arrivalStationIds.toString(), formattedDate)
          .subscribe((response) => {
            // Logic to find selected train and update available seats
            const selectedTrain = response.data.find((train: { trainId: number }) => train.trainId === trainId);
  
            if (selectedTrain) {
              this.selectedTrainSeats = selectedTrain.totalAvailableSeats;
              // Optional: Open modal to display seat availability
              // this.openchecking(); 
            }
          });
          this.openchecking();
      } else {
        console.error('Invalid station names');
      }
    }
    
    // Function to open modal
  
    openchecking() {
      const model = document.getElementById("mycheck");
      if (model != null) {
        model.style.display = 'block';
      }
    }
   

    closechecking() {
      const model = document.getElementById("mycheck");
      if (model != null) {
        model.style.display = 'none';
      }
    }
//check and convert station name to id

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
}
