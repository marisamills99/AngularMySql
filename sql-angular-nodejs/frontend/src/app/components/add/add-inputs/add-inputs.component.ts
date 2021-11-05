import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Input } from 'src/app/models/input.model';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-inputs',
  templateUrl: './add-inputs.component.html',
  styleUrls: ['./add-inputs.component.css']
})
export class AddInputsComponent implements OnInit {
    submitted = false;
    module_id=0;
    curr=this.moduleService.currentInput
    newModule: Input={
      Input_ID:'',
      Module_ID : '',
      Input_Filename: '',
      Input_Notes: '',
      //LastUpdated: null,
      

    };
    constructor(private moduleService: ModuleService,private datePipe: DatePipe,
      private route: ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      if(this.route.snapshot.params.module_id){
        this.module_id=this.route.snapshot.params.module_id;
        this.newModule ={
          Module_ID : this.curr.Module_ID,
          Input_ID : this.curr.Input_ID,
          Input_Filename : this.curr.Input_Filename,
          Input_Notes : this.curr.Input_Notes
        };
      }
      console.log(this.moduleService.currentModule);
    }
    saveModule(): void {
      const data = {
        Module_ID : this.newModule.Module_ID,
        Input_Filename : this.newModule.Input_Filename,
        Input_Notes : this.newModule.Input_Notes,
      };
      if(!this.module_id){
        const newDate=new Date();
        let arrayofvals:string[]=[data.Module_ID,data.Input_Filename,data.Input_Notes,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
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
        Input_Id:this.route.snapshot.params.id,
        Module_ID:this.newModule.Module_ID,
        Input_Filename : this.newModule.Input_Filename,
        Input_Notes : this.newModule.Input_Notes,
       
      };
      this.moduleService.updateInput(currentModule,data)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/inputs'])
          },
          error => {
            console.log(error);
          });
          
    }
  
  

}
