import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url: string = "https://portfolio-lucas24865.koyeb.app/api/getData/PortfolioText/GetAll";
  urlid: string = "https://portfolio-lucas24865.koyeb.app/api/getData/PortfolioText/GetByTypeId?id=";
  addUrl: string = "https://portfolio-lucas24865.koyeb.app/api/PortfolioText/Add";
  deleteUrl: string = "https://portfolio-lucas24865.koyeb.app/api/PortfolioText/Add?id=";
  public static objData: any;
  public static permission: any = { admin: false };
  constructor(private http: HttpClient, private modalService: NgbModal) {
  }

  openEditModal(obj: any) {
    PortfolioService.objData = obj;
    this.modalService.open(EditModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }

  Add(obj:PortfolioTextObj):Observable<any>{    
    return this.http.post(this.addUrl,obj);
  }
  
  Delete(id:number):Observable<any>{
    return this.http.delete(this.deleteUrl + id.toString());
  }
  openAddModal(type: number) {
    PortfolioService.objData = new PortfolioTextObj(type);
    this.modalService.open(EditModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }

  DeleteElement(id: string) {
    PortfolioService.objData = new PortfolioTextObj;
    this.modalService.open(EditModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }
  getData(): Observable<any> {
    return this.http.get(this.url);
  }
  getAdmin(): any {
    return PortfolioService.permission;
  }
  setAdmin(bool: boolean) {
    PortfolioService.permission.admin = bool;
  }

  getDataId(id: string): Observable<any> {
    return this.http.get(this.urlid + id);
  }
  filterById(data: any[], id: number): any {
    return data.filter(function (el) {
      return el.type === id;
    });
  }
}

export class PortfolioTextObj {
  id: number
  text: string
  description: string
  url: string
  type: number
  constructor(type?: number) {
    if (type) {
      this.id = 0
      this.text = ""
      this.description = ""
      this.url = ""
      this.type = 0
    }
    else {
      this.id = 0
      this.text = ""
      this.description = ""
      this.url = ""
      this.type = type!
    }
  }
}
