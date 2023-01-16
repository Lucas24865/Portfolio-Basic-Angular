import { Component, OnInit } from '@angular/core';
import { PortfolioService, PortfolioTextObj } from 'src/app/services/portfolio.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  Name: PortfolioTextObj;
  faPen = faPen;
  AboutMe: PortfolioTextObj;
  permission: any = PortfolioService.permission;

  constructor(private data: PortfolioService,) {
    this.Name = new PortfolioTextObj
    this.AboutMe = new PortfolioTextObj
  }
  ngOnInit(): void {

    PortfolioService.portFolioData.subscribe(data => {
      this.Name = data.filter((dat:PortfolioTextObj) =>{
      return dat.type === 2 ;
    })[0];
    
    this.AboutMe = data.filter((dat:PortfolioTextObj) =>{
      return dat.type === 6 ;
    })[0];
    });

  }
  toggleAdmin() {
    PortfolioService.permission.admin = !PortfolioService.permission.admin
  }
  openModalAboutMe() {
    this.data.openEditModal(this.AboutMe);
  }
  openModalName() {
    this.data.openEditModal(this.Name);
  }
}