import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDatepicker, MatFormField, MatInput, MatButton } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TeamService } from '../team.service';
import { Format } from '../format.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @ViewChild('filtersForm') form: NgForm;

  @Input() snav;

  formatList: Format[] = [];
  selectedFormat: string;
  selectedStartDate = new Date();
  selectedEndDate = new Date();

  constructor(private router: Router, private teamService:TeamService, private deviceService: DeviceDetectorService) { }
  
  ngOnInit() {
    this.formatList = this.teamService.formatList;
    this.selectedFormat = this.formatList.find( (format) => format.default == true).name;
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
    var format = this.selectedFormat;
    var startDate = this.selectedStartDate.getTime()/1000;
    var endDate = this.selectedEndDate.getTime()/1000;
    this.snav.toggle();
    this.router.navigate(['/teams', format, startDate, endDate]);
  }

}
