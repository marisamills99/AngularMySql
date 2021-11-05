import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Output } from 'src/app/models/output.model';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-outputs',
  templateUrl: './add-outputs.component.html',
  styleUrls: ['./add-outputs.component.css']
})
export class AddOutputsComponent implements OnInit {

  submitted = false;
    module_id=0;
    curr=this.moduleService.currentOutput
    newModule: Output={
      Output_ID:'',
      Module_ID : '',
      Output_Filename: '',
      Output_Notes: '',
      //LastUpdated: null,
      

    };
    constructor(private moduleService: ModuleService,private datePipe: DatePipe,
      private route: ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      if(this.route.snapshot.params.module_id){
        this.module_id=this.route.snapshot.params.module_id;
        this.newModule ={
          Module_ID : this.curr.Module_ID,
          Output_ID : this.curr.Output_ID,
          Output_Filename : this.curr.Output_Filename,
          Output_Notes : this.curr.Output_Notes
        };
      }
    }
    saveModule(): void {
      const data = {
        Module_ID : this.curr.Module_ID,
        Output_Filename : this.newModule.Output_Filename,
        Output_Notes : this.newModule.Output_Notes,
      };
      if(!this.module_id){
        const newDate=new Date();
        let arrayofvals:string[]=[data.Module_ID, data.Output_Filename,data.Output_Notes,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
        for (let val in arrayofvals){
          this.moduleService.createstr=this.moduleService.createstr.replace('?',arrayofvals[val]);
        }
      this.moduleService.createNew(this.moduleService.createstr)
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
        Output_Id:this.route.snapshot.params.id,
        Module_ID:this.newModule.Module_ID,
        Output_Filename : this.newModule.Output_Filename,
        Output_Notes : this.newModule.Output_Notes,
       
      };
      const newDate=new Date();
      let arrayofvals:string[]=[data.Module_ID,data.Output_Filename,data.Output_Notes,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
      for (let val in arrayofvals){
        this.moduleService.updatestr=this.moduleService.updatestr.replace('?',arrayofvals[val]);
      }
      this.moduleService.updatestr=this.moduleService.updatestr.replace('?',currentModule.toString());
      this.moduleService.updateAny(currentModule,this.moduleService.updatestr)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/outputs'])
          },
          error => {
            console.log(error);
          });
          
    }

}
