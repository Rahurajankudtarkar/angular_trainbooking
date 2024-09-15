import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../../service/train.service'; 
import { Train } from '../../model/train';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  trainForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private trainService: TrainService) {
    // Initialize the form
    this.trainForm = this.fb.group({
      trainNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      trainName: ['', Validators.required],
      departureStationId: ['', Validators.required],
      arrivalStationId: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      totalSeats: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      departureDate: ['', Validators.required],
    });
  }

  // Getters for easy access to form controls
  get f() {
    return this.trainForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.trainForm.invalid) {
      return;
    }
  
    // Create a new train object based on the form values
    const newTrain: Train = this.trainForm.value as Train;
  
    // Post the train data
    this.trainService.addNewTrain(newTrain).subscribe({
      next: (response) => {
        console.log('Train added successfully', response);
        alert('Train added successfully');
        this.trainForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error adding train', error);
        alert('Failed to add train');
      }
    });
  }
  

  closeAdminModal() {
    this.trainForm.reset();
    this.submitted = false;
  }
}