import { Component } from '@angular/core';
import { PortfolioService, PortfolioTextObj } from 'src/app/services/portfolio.service';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  Languages: PortfolioTextObj[] = [];
  WebSkills: PortfolioTextObj[] = [];
  Programming: PortfolioTextObj[] = [];
  Frameworks: PortfolioTextObj[] = [];
  Databases: PortfolioTextObj[] = [];
  permission:any = PortfolioService.permission;
  faPen=faPen;
  faXmark=faXmark;
  faPlus=faPlus;
  constructor(private data: PortfolioService) {
  }

  ngOnInit(): void {
    this.data.getDataId("11").subscribe(data => {
      this.Languages = data;
    });
    this.data.getDataId("12").subscribe(data => {
      this.WebSkills = data;
    });
    this.data.getDataId("13").subscribe(data => {
      this.Programming = data;
    });
    this.data.getDataId("14").subscribe(data => {
      this.Frameworks = data;
    });
    this.data.getDataId("15").subscribe(data => {
      this.Databases = data;
    });
  }
  openModalLanguages(index:number){
    this.data.openEditModal(this.Languages[index]);
  }
  openModalWebSkills(index:number){
    this.data.openEditModal(this.WebSkills[index]);
  }
  openModalProgramming(index:number){
    this.data.openEditModal(this.Programming[index]);
  }
  openModalFrameworks(index:number){
    this.data.openEditModal(this.Frameworks[index]);
  }
  openModalDatabases(index:number){
    this.data.openEditModal(this.Databases[index]);
  }

  DeleteLanguages(index:number){
    this.data.openEditModal(this.Languages[index]);
  }
  DeleteWebSkills(index:number){
    this.data.openEditModal(this.WebSkills[index]);
  }
  DeleteProgramming(index:number){
    this.data.openEditModal(this.Programming[index]);
  }
  DeleteFrameworks(index:number){
    this.data.openEditModal(this.Frameworks[index]);
  }
  DeleteDatabases(index:number){
    this.data.openEditModal(this.Databases[index]);
  }

  AddLanguages(){
    this.data.openAddModal(11);
  }
  AddWebSkills(){
    this.data.openAddModal(12);
  }
  AddProgramming(){
    this.data.openAddModal(13);
  }
  AddFrameworks(){
    this.data.openAddModal(14);
  }
  AddDatabases(){
    this.data.openAddModal(15);
  }




}
