import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module } from 'src/app/models/module.model';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  
  submitted = false;
  module_id=0;
  curr=this.moduleService.currentModule
  newModule: Module={
    Module_ID : '',
    ModuleName : '',
    DescrName : '',
    Purpose : '',
    ModuleCategory : '',
    Nbr_ksh : ''
  };
  constructor(private moduleService: ModuleService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.module_id){
      this.module_id=this.route.snapshot.params.module_id;
      this.newModule ={
        Module_ID : this.curr.Module_ID,
        ModuleName : this.curr.ModuleName,
        DescrName : this.curr.DescrName,
        Purpose : this.curr.Purpose,
        ModuleCategory : this.curr.ModuleCategory,
        Nbr_ksh : this.curr.Nbr_ksh
      };
    }
    console.log(this.moduleService.currentModule);
  }
  saveModule(): void {
    const data = {
      Module_ID: this.newModule.Module_ID,
      ModuleName: this.newModule.ModuleName,
      DescrName : this.newModule.DescrName,
      Purpose : this.newModule.Purpose,
      ModuleCategory : this.newModule.ModuleCategory,
      Nbr_ksh : this.newModule.Nbr_ksh,
    };
    if(!this.module_id){
    this.moduleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
      }
      else{
        this.edit(this.module_id);
      }
  }

  NewModule(): void {
    this.submitted = false;
    this.newModule = {
      
    };
  }
  edit(currentModule:number){
    
    const data = {
      Module_ID: this.newModule.Module_ID,
      ModuleName: this.newModule.ModuleName,
      DescrName : this.newModule.DescrName,
      Purpose : this.newModule.Purpose,
      ModuleCategory : this.newModule.ModuleCategory,
      Nbr_ksh : this.newModule.Nbr_ksh,
    };
    this.moduleService.update(currentModule,data)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/modules'])
        },
        error => {
          console.log(error);
        });
        
  }
}
