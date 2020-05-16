import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: TeamService) { }

  articleContent: any;

  ngOnInit() {
    this.getHelp();
  }

  getHelp() {
    this.service.getHelp()
    .subscribe(content => {
      this.articleContent = content;
    });
  }


}
