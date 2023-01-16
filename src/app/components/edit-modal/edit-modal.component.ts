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
	addmode: boolean = false;
	close() {
		this.ngbActiveModal.dismiss();
	}

	form: FormGroup;
	constructor(private formBuilder: FormBuilder, private data: PortfolioService, private ngbActiveModal: NgbActiveModal) {
		if (PortfolioService.objData.id === -1) {
			this.addmode = true;
		}
		else {
			this.addmode = true;
		}
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
		this.data.Loading();
		this.data.Add(this.form.value).subscribe({
			next: (data) => { console.log(JSON.stringify(data)); Success(this.addmode); this.ngbActiveModal.close('Success') },
			error: (err) => Error(this.addmode)
		});
	}

}
function Error(addmode: boolean) {
	if (addmode)
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No se pudo editar!'
		}).then(() => {
			window.location.reload();
		})
	else
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No se pudo editar!'
		})
}
function Success(addmode: boolean) {
	if (addmode)
		Swal.fire(
			'Exitoso!',
			'Se agregó correctamente',
			'success').then(() => {
				window.location.reload();
			})
	else
		Swal.fire(
			'Exitoso!',
			'Se editó correctamente',
			'success')
}