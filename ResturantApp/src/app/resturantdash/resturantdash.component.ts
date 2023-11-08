import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResturantData } from './resturant.model';

@Component({
  selector: 'app-resturantdash',
  templateUrl: './resturantdash.component.html',
  styleUrls: ['./resturantdash.component.css']
})
export class ResturantdashComponent implements OnInit {
  formValue!: FormGroup
  resturantModel: ResturantData = new ResturantData;
  allResturantData: any;
  showAdd!:boolean;
  showbtn!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickAddResturant(){
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  addResturant() {
    this.resturantModel.name = this.formValue.value.name;
    this.resturantModel.email = this.formValue.value.email;
    this.resturantModel.mobile = this.formValue.value.mobile;
    this.resturantModel.address = this.formValue.value.address;
    this.resturantModel.services = this.formValue.value.services;

    this.api.postResturant(this.resturantModel).subscribe(res => {
      alert("Resturant Added successfully")
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("Error creating Resturant");
      }
    )
  }
  getAllData() {
    this.api.getResturant().subscribe(res => {
      this.allResturantData = res;
    })
  }

  deleteResturant(data:any){
    this.api.deleteResturant(data.id).subscribe(res=>{
      alert("Resturant deleted successfully");
      this.getAllData();
    })
  }

  onEditResturant(data:any){
    this.showAdd = false;
    this.showbtn = true;
    this.resturantModel.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResturant(){
    this.resturantModel.name = this.formValue.value.name;
    this.resturantModel.email = this.formValue.value.email;
    this.resturantModel.mobile = this.formValue.value.mobile;
    this.resturantModel.address = this.formValue.value.address;
    this.resturantModel.services = this.formValue.value.services;

    this.api.updateResturant(this.resturantModel,this.resturantModel.id).subscribe(res=>{
      alert("Resturant updated successfully");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();
    })
  }
}
