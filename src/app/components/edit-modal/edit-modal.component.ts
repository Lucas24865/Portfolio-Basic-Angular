import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService, PortfolioTextObj } from 'src/app/services/portfolio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({	
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {

	close(){
		this.ngbActiveModal.dismiss();
	}

	form: FormGroup;
	constructor(private formBuilder: FormBuilder,  private data: PortfolioService, private ngbActiveModal:NgbActiveModal  ) {
		  this.form = this.formBuilder.group(
		{
		  id: [PortfolioService.objData.id, [Validators.required]],
		  description: [PortfolioService.objData.description, [Validators.required]],
		  text: [PortfolioService.objData.text, [Validators.required]],
		  url: [PortfolioService.objData.url, [Validators.required]],
		  type: [PortfolioService.objData.type, [Validators.required]]
		}
	  )
	}

	get id() {
	  return this.form.get('id');
	}
	get description() {
	  return this.form.get('description');
	}
	get text() {
	  return this.form.get('text');
	}
	get url() {
	  return this.form.get('url');
	}  
	get type() {
	  return this.form.get('type');
	}

	onSend(event: Event) {
	  event.preventDefault;
	  Swal.fire({
		title: 'Cargando!',
		icon: 'info',
		text: 'Por favor espere.',
		showConfirmButton: false,
		allowOutsideClick: false
	  });
	  this.data.Add(this.form.value).subscribe({
		next: (data) => { console.log(JSON.stringify(data));Success();this.data.setAdmin(true); },
		error: (err) => Error()
	  });
	}

}
function Error(){
	Swal.fire({
	  icon: 'error',
	  title: 'Oops...',
	  text: 'No se pudo editar!'
	})
  }
  function Success(){
	Swal.fire(
	  'Exitoso!',
	   'Se editó correctamente',
	   'success')
  }