import { Component } from '@angular/core';
import { PortfolioService, PortfolioTextObj } from 'src/app/services/portfolio.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experience: PortfolioTextObj[] = [];
  faPen = faPen;
  faXmark = faXmark;
  faPlus = faPlus;
  permission: any = PortfolioService.permission;
  constructor(private data: PortfolioService) {
  }

  ngOnInit(): void {

    this.data.getDataId("8").subscribe(data => {
      this.experience = data;
    });

  }

  openModal(index: number) {
    this.data.openEditModal(this.experience[index]);
  }
  Add() {
    this.data.openAddModal(
      {
        id: -1,
        text: "",
        description: "",
        url: "",
        type: 8
      }
    );
  }
  Delete(id: number) {
    this.data.Loading();
    this.data.Delete(id).subscribe({
      next: (data) => { console.log(JSON.stringify(data)); this.data.Deleted(); this.ngOnInit() },
      error: (err) => this.data.DeleteError()
    });
  }
}
