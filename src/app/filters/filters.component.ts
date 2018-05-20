import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDatepicker, MatFormField, MatInput, MatButton } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @ViewChild('filtersForm') form: NgForm;

  @Input() snav;

  selectedStartDate = new Date();
  selectedEndDate = new Date();

  constructor(private router: Router) { }
  
  ngOnInit() {
    var dayOfMonth = this.selectedStartDate.getDate();
    this.selectedStartDate.setDate(dayOfMonth - 15);
  }

  validDates(): boolean {
    return (this.selectedEndDate && this.selectedStartDate && (this.selectedStartDate <= this.selectedEndDate));
  }

  onSubmit(form: NgForm) {
    console.log(this.validDates());
    console.log(this.selectedStartDate <= this.selectedEndDate);
    console.log(form);
    var startDate = this.selectedStartDate.getTime()/1000;
    var endDate = this.selectedEndDate.getTime()/1000;
    this.snav.toggle();
    this.router.navigate(['/teams', startDate, endDate]);
  }

}
