import { Component, OnInit } from '@angular/core';
import { PortfolioService, PortfolioTextObj } from 'src/app/services/portfolio.service';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {
  studies: PortfolioTextObj[] = [];
  faPen=faPen;
  faXmark=faXmark;
  faPlus=faPlus;
  permission:any = PortfolioService.permission;
  constructor(private data: PortfolioService) {
  }

  ngOnInit(): void {
    this.data.getDataId("7").subscribe(data => {
      this.studies = data;
    });
  }
  openModal(index:number){
    this.data.openEditModal(this.studies[index]);
  }

}
