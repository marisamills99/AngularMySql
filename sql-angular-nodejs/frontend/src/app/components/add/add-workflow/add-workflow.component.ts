import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Workflow } from 'src/app/models/workflow.model';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.css']
})
export class AddWorkflowComponent implements OnInit {

  submitted = false;
    module_id=0;
    curr=this.moduleService.currentWorkflow
    newModule: Workflow={
      Workflow_ID : "",
          Analyst_ID : "",
          Workflow_Notes : "",
          Workflow_Status : ""
    };

    constructor(private moduleService: ModuleService,private datePipe: DatePipe,
      private route: ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      if(this.route.snapshot.params.module_id){
        this.module_id=this.route.snapshot.params.module_id;
        this.newModule ={
          Workflow_ID : this.curr.Workflow_ID,
          Analyst_ID : this.curr.Analyst_ID,
          Workflow_Notes : this.curr.Workflow_Notes,
          Workflow_Status : this.curr.Workflow_Status
        };
      }
    }
    saveModule(): void {
      const data = {
        Workflow_ID:this.route.snapshot.params.id,
        Analyst_ID : this.newModule.Analyst_ID,
        Workflow_Notes : this.newModule.Workflow_Notes,
        Workflow_Status : this.newModule.Workflow_Status
      };
      if(!this.module_id){
        const newDate = new Date();
        let arrayofvals:string[]=[data.Analyst_ID,data.Workflow_Notes,data.Workflow_Status,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd"),this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
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
        Workflow_ID:this.route.snapshot.params.id,
        Analyst_ID : this.newModule.Analyst_ID,
        Workflow_Notes : this.newModule.Workflow_Notes,
        Workflow_Status : this.newModule.Workflow_Status
       
      };
      const newDate = new Date();
      let arrayofvals:string[]=[data.Analyst_ID,data.Workflow_Notes,data.Workflow_Status,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
      for (let val in arrayofvals){
        this.moduleService.updatestr=this.moduleService.updatestr.replace('?',arrayofvals[val]);
      }
      this.moduleService.updatestr=this.moduleService.updatestr.replace('?',currentModule.toString());
      this.moduleService.updateAny(currentModule,this.moduleService.updatestr)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/workflow'])
          },
          error => {
            console.log(error);
          });
          
    }

}

