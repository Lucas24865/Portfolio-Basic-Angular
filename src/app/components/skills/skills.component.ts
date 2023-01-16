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

    PortfolioService.portFolioData.subscribe(data => {
      this.Languages = data.filter((dat:PortfolioTextObj) =>{
        return dat.type === 11 ;
      });
      this.WebSkills = data.filter((dat:PortfolioTextObj) =>{
        return dat.type === 12 ;
      });
      this.Programming = data.filter((dat:PortfolioTextObj) =>{
        return dat.type === 13 ;
      });
      this.Frameworks = data.filter((dat:PortfolioTextObj) =>{
        return dat.type === 14 ;
      });
      this.Databases = data.filter((dat:PortfolioTextObj) =>{
        return dat.type === 15 ;
      });
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

  Delete(index:number){
    this.data.Loading();
    this.data.Delete(index).subscribe({
      next: (data) => { console.log(JSON.stringify(data));this.data.Deleted();this.ngOnInit()},
      error: (err) => this.data.DeleteError()
    });
    
  }


  AddLanguages(){
    this.data.openAddModal(
      {  id: -1,
      text: "",
      description: "",
      url: "",
      type: 11}
      );
  }
  AddWebSkills(){
    this.data.openAddModal(
      {  id: -1,
      text: "",
      description: "",
      url: "",
      type: 12}
      );
  }
  AddProgramming(){
    this.data.openAddModal(
      {  id: -1,
      text: "",
      description: "",
      url: "",
      type: 13}
      );
  }
  AddFrameworks(){
    this.data.openAddModal(
      {  id: -1,
      text: "",
      description: "",
      url: "",
      type: 14}
      );
  }
  AddDatabases(){
    this.data.openAddModal(
      {  id: -1,
      text: "",
      description: "",
      url: "",
      type: 15}
      );
  }


}
