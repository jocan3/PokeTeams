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
  ladderReport: boolean = false;

  private threeMonths: number;

  constructor(private router: Router, private teamService:TeamService, private deviceService: DeviceDetectorService) { }
  
  ngOnInit() {
    this.formatList = this.teamService.formatList;
    this.selectedFormat = this.formatList.find( (format) => format.default == true).name;
    var dayOfMonth = this.selectedStartDate.getDate();
    this.selectedStartDate.setDate(dayOfMonth - 7);

    let d = new Date();
    d.setMonth(d.getMonth() - 3);
    let e = new Date();
    this.threeMonths = e.getTime() - d.getTime();
  }

  validDates(): boolean {
    return (this.selectedEndDate && this.selectedStartDate && (this.selectedStartDate <= this.selectedEndDate) && (this.validateRange()));
  }

  isMobile(): boolean {
    var deviceInfo = this.deviceService.getDeviceInfo();
    return deviceInfo.device.toLowerCase() =='android' || deviceInfo.device.toLowerCase() == 'iphone';
  }

  onSubmit(form: NgForm) {
    var format = this.selectedFormat;
    var startDate = this.selectedStartDate.getTime()/1000;
    var endDate = this.selectedEndDate.getTime()/1000;
    var ladderReport = this.ladderReport;
    this.snav.toggle();
    this.router.navigate(['/teams', format, startDate, endDate, ladderReport]);
  }

  private validateRange() {
    return (this.selectedEndDate.getTime() - this.selectedStartDate.getTime()) < this.threeMonths;
  }

}
