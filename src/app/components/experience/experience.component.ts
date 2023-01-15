import { Component } from '@angular/core';
import { PortfolioService, PortfolioTextObj } from 'src/app/services/portfolio.service';
import {faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experience: PortfolioTextObj[] = [];
  faPen=faPen;
  permission:any = PortfolioService.permission;
  constructor(private data: PortfolioService) {
  }

  ngOnInit(): void {
    this.data.getDataId("8").subscribe(data => {
      this.experience = data;
    });
  }
  openModal(index:number){
    this.data.openEditModal(this.experience[index]);
  }
  Add(){
    
  }
}
