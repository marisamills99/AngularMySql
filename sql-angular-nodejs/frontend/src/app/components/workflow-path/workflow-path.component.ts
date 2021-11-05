import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { Workflow } from 'src/app/models/workflow.model';
import { Module } from 'src/app/models/module.model';

@Component({
  selector: 'app-workflow-path',
  templateUrl: './workflow-path.component.html',
  styleUrls: ['./workflow-path.component.css']
})
export class WorkflowPathComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Path ID",  "Workflow ID" , "Module ID" ,"Ksh" , 'Notes' , 'Status','Date','Edit'];
  modules?: Module[]=[];
  currentIndex = -1;
  searchText: string = '';
  previous: string = '';
  
  @HostListener('input') oninput() {
    this.searchItems();
}
  constructor(private moduleService: ModuleService,private cdRef: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.retrieveModules();
    
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(7);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  retrieveModules(): void {
    this.moduleService.getWorkflowPath()
      .subscribe(
        data => {
          this.modules = data;

          this.mdbTable.setDataSource(this.modules);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          console.log(error);
        });
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
}
