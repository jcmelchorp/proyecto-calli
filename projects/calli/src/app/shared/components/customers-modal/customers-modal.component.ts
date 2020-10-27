import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Customer } from '../../../customers/models/customer.model';

@Component({
  selector: 'calli-customers-modal',
  templateUrl: './customers-modal.component.html',
  styleUrls: ['./customers-modal.component.scss']
})
export class CustomersModalComponent implements OnInit {
  times = faTimes;
  heading: string;
  customer: Customer = {};
  customerForm: FormGroup;

  customerData: Subject<Customer> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<CustomersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      id: new FormControl(this.data.id, [Validators.required]),
      priority: new FormControl(this.data.priority, [Validators.required]),
      name: new FormControl(this.data.name, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required])
    });
  }

  onSave() {
    if (this.customerForm.valid) {
      this.customerData.next(this.customerForm.value);
      this.dialogRef.close();
    } else {
      const controls = this.customerForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

}
