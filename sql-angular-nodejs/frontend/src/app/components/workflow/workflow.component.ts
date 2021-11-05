import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { Workflow } from 'src/app/models/workflow.model';
import { Module } from 'src/app/models/module.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Analyst ID",  "Workflow ID" , "Workflow Date" ,"Notes" , 'Status' , 'Status Date','Edit'];
  modules?: Workflow[]=[];
  currentIndex = -1;
  searchText: string = '';
  previous: string = '';
  workflow_id=0;
  @HostListener('input') oninput() {
    this.searchItems();
}
  constructor(private moduleService: ModuleService,private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.retrieveModules();
    if(this.route.snapshot.params.workflow_id){
      this.workflow_id=this.route.snapshot.params.workflow_id;
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(7);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  retrieveModules(): void {
    this.moduleService.getWorkflow()
      .subscribe(
        data => {
          this.modules = data;

          this.mdbTable.setDataSource(this.modules);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          console.log(error);
        });
        this.moduleService.createstr="INSERT INTO Workflow SET Analyst_ID = '?',  Workflow_Notes = '?', Workflow_Status = '?', Workflow_Date='?', Status_Date='?'"
  }
  
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.modules = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
        this.modules = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
    }
  }
  delete(currentModule:number){
    this.moduleService.delete(currentModule,"Workflow")
      .subscribe(
        data => {
          console.log(data);
          
        },
        error => {
          console.log(error);
        });
        this.retrieveModules();
  }
  edit(currentModule:Workflow){
    this.moduleService.currentWorkflow= currentModule
    this.moduleService.updatestr="UPDATE Workflow SET Analyst_ID = '?',  Workflow_Notes = '?', Workflow_Status = '?', Status_Date='?' WHERE Workflow_ID = '?'";
    this.router.navigate(['/editWorkflow',currentModule.Workflow_ID]);
  }
  

}
