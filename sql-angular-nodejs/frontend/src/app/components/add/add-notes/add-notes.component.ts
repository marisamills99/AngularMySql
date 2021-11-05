import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Notes } from 'src/app/models/note.model';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {

  submitted = false;
  module_id=0;
  curr=this.moduleService.currentNotes
  newModule: Notes={
   
    

  };
  constructor(private moduleService: ModuleService,private datePipe: DatePipe,
    private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.module_id){
      this.module_id=this.route.snapshot.params.module_id;
      this.newModule ={
        Analyst_ID : this.curr.Analyst_ID,
        Notes_ID : this.curr.Notes_ID,
        Module_ID : this.curr.Module_ID,
        AnalystNotes : this.curr.AnalystNotes
      };
    }
  }
  saveModule(): void {
    const data = {
      Analyst_ID : this.newModule.Analyst_ID,
      Module_ID : this.newModule.Module_ID,
      AnalystNotes : this.newModule.AnalystNotes,
    };
    if(!this.module_id){
      const newDate=new Date();
      let arrayofvals:string[]=[data.Module_ID,data.AnalystNotes,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
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
      Notes_ID:this.route.snapshot.params.id,
      Module_ID : this.newModule.Module_ID,
      Analyst_ID : this.newModule.Analyst_ID,
      AnalystNotes : this.newModule.AnalystNotes,
    };
    const newDate=new Date();
    let arrayofvals:string[]=[data.Module_ID,data.Analyst_ID,data.AnalystNotes,this.datePipe.transform(newDate.toISOString(),"yyyy-MM-dd")];
    for (let val in arrayofvals){
      this.moduleService.updatestr=this.moduleService.updatestr.replace('?',arrayofvals[val]);
    }
    this.moduleService.updatestr=this.moduleService.updatestr.replace('?',currentModule.toString());
    this.moduleService.updateAny(currentModule,this.moduleService.updatestr)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/notes'])
        },
        error => {
          console.log(error);
        });
        
  }
}
