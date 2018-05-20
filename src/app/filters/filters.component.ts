import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDatepicker, MatFormField, MatInput, MatButton } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  constructor(private router: Router, private deviceService: DeviceDetectorService) { }
  
  ngOnInit() {
    var dayOfMonth = this.selectedStartDate.getDate();
    this.selectedStartDate.setDate(dayOfMonth - 15);
  }

  validDates(): boolean {
    return (this.selectedEndDate && this.selectedStartDate && (this.selectedStartDate <= this.selectedEndDate));
  }

  isMobile(): boolean {
    var deviceInfo = this.deviceService.getDeviceInfo();
    return deviceInfo.device =='android' || deviceInfo.device == 'iphone';
  }

  onSubmit(form: NgForm) {
    var startDate = this.selectedStartDate.getTime()/1000;
    var endDate = this.selectedEndDate.getTime()/1000;
    this.snav.toggle();
    this.router.navigate(['/teams', startDate, endDate]);
  }

}
