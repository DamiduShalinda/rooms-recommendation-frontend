import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchData } from '../models/search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  bookingForm: FormGroup = new FormGroup({});
  searchData! : SearchData
  response! : any
  error_message = false;

  constructor(private fb: FormBuilder , private router : Router) { 
    this.bookingForm = this.fb.group({
      checkInDate: ['' , [Validators.required]],
      numberOfNights: ['' , [Validators.required]],
      rooms: this.fb.array([])
    });

    this.addRoom();
  }
  


  get rooms() {
    return this.bookingForm.get('rooms') as FormArray;
  }

  addRoom() {
    this.rooms.push(this.fb.group({
      numberOfAdults: [''],
      numberOfRooms : ['']
    }));
  }

  removeRoom(index: number) {
    if (index !== 0) {
      this.rooms.removeAt(index);
    }
  }

  async onSubmit() {
     this.searchData = this.bookingForm.value;
     const today = new Date()
     const checkInDate = new Date(this.searchData.checkInDate)
    if (this.bookingForm.valid && checkInDate >= today) {
     this.router.navigate(['/search-result'] , { queryParams: { searchData: JSON.stringify(this.searchData) } })
    } else if (checkInDate <= today){
      this.error_message = true
      this.bookingForm.get('checkInDate')?.patchValue('');
    }
  }

  onClickClear(){
    this.bookingForm.reset()
  }


}
