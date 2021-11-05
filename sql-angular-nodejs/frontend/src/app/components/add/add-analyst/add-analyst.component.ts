import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Analyst } from 'src/app/models/analyst.model';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-analyst',
  templateUrl: './add-analyst.component.html',
  styleUrls: ['./add-analyst.component.css']
})
export class AddAnalystComponent implements OnInit {

  submitted = false;
    module_id=0;
    curr=this.moduleService.currentAnalyst
    newModule: Analyst={
      Analyst_ID:'',
      Analyst_Last : '',
      Analyst_First: '',
      Analyst_Org: '',
      Analyst_Phone:''
      //LastUpdated: null,
      

    };

    constructor(private moduleService: ModuleService,private datePipe: DatePipe,
      private route: ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      if(this.route.snapshot.params.module_id){
        this.module_id=this.route.snapshot.params.module_id;
        this.newModule ={
          Analyst_ID : this.curr.Analyst_ID,
          Analyst_Last: this.curr.Analyst_Last,
          Analyst_First: this.curr.Analyst_First,
          Analyst_Org: this.curr.Analyst_Org,
          Analyst_Phone: this.curr.Analyst_Phone
        };
      }
    }
    saveModule(): void {
      const data = {
        Analyst_Last : this.newModule.Analyst_Last,
        Analyst_First: this.newModule.Analyst_First,
        Analyst_Org: this.newModule.Analyst_Org,
        Analyst_Phone:this.newModule.Analyst_Phone
       
      };
      
      if(!this.module_id){
      const newDate = new Date();
      let arrayofvals:string[]=[data.Analyst_Last,data.Analyst_First,data.Analyst_Org,data.Analyst_Phone,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd") ];
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
        Analyst_Id:this.route.snapshot.params.id,
        Analyst_Last : this.newModule.Analyst_Last,
        Analyst_First: this.newModule.Analyst_First,
        Analyst_Org: this.newModule.Analyst_Org,
        Analyst_Phone:this.newModule.Analyst_Phone
       
      };
      const newDate = new Date();
      let arrayofvals:string[]=[data.Analyst_Last,data.Analyst_First,data.Analyst_Org,data.Analyst_Phone,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd") ];
      for (let val in arrayofvals){
        this.moduleService.updatestr=this.moduleService.updatestr.replace('?',arrayofvals[val]);
      }
      this.moduleService.updatestr=this.moduleService.updatestr.replace('?',currentModule.toString());
      this.moduleService.updateAny(currentModule,this.moduleService.updatestr)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/analysts'])
          },
          error => {
            console.log(error);
          });
          
    }

}
