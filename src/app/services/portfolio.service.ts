import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url: string = "https://portfolio-lucas24865.koyeb.app/api/getData/PortfolioText/GetAll";
  urlid: string = "https://portfolio-lucas24865.koyeb.app/api/getData/PortfolioText/GetByTypeId?id=";
  addUrl: string = "https://portfolio-lucas24865.koyeb.app/api/PortfolioText/Add";
  deleteUrl: string = "https://portfolio-lucas24865.koyeb.app/api/PortfolioText/Delete?id=";

  public static objData: any;
  public static portFolioData: Observable<any>;
  public static permission: any = { admin: false };
  constructor(private http: HttpClient, private modalService: NgbModal) {
    PortfolioService.portFolioData = this.http.get(this.url);

  }

  openEditModal(obj: any) {
    PortfolioService.objData = obj;
    this.modalService.open(EditModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }

  Add(obj: PortfolioTextObj): Observable<any> {
    return this.http.post(this.addUrl, obj);
  }

  Delete(id: number): Observable<any> {
    return this.http.delete(this.deleteUrl + id.toString());
  }
  openAddModal(obj: PortfolioTextObj) {
    PortfolioService.objData = obj;
    this.modalService.open(EditModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }

  DeleteElement(id: string) {
    PortfolioService.objData = new PortfolioTextObj;
    this.modalService.open(EditModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }
  refreshData() {
    PortfolioService.portFolioData = this.http.get(this.url);
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
  DeleteError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El objeto no pudo ser eliminado!'
    })
  }
  Deleted() {
    Swal.fire({
      icon: 'success',
      title: 'El objeto fue eliminado exitosamente',
    })
  }
  Loading() {
    Swal.fire({
      title: 'Cargando!',
      icon: 'info',
      text: 'Por favor espere.',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }
}

export class PortfolioTextObj {
  id: number
  text: string
  description: string
  url: string
  type: number
  constructor() {
    this.id = 0
    this.text = ""
    this.description = ""
    this.url = ""
    this.type = 0
  }
}
