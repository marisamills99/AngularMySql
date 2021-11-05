import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { ModuleService } from 'src/app/services/module.service';
import { Output } from 'src/app/models/output.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { Module } from 'src/app/models/module.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-output',
  templateUrl: './module-output.component.html',
  styleUrls: ['./module-output.component.css']
})
export class ModuleOutputComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Output_ID",  "Module ID" , "Output Filename" , 'Notes' , 'Updated','Edit'];
  modules?: Output[]=[];
  currentIndex = -1;
  searchText: string = '';
  previous: string = '';
  
  @HostListener('input') oninput() {
    this.searchItems();
}
  constructor(private moduleService: ModuleService,private cdRef: ChangeDetectorRef,private router: Router) { }
  
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
    this.moduleService.getOutput()
      .subscribe(
        data => {
          this.modules = data;
          this.mdbTable.setDataSource(this.modules);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          console.log(error);
        });
        this.moduleService.createstr="INSERT INTO Module_Output SET Module_ID='?', Output_Filename = '?', Output_Notes = '?', LastUpdated='?' ";
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
    this.moduleService.delete(currentModule,"Module_Output")
      .subscribe(
        data => {
          console.log(data);
          
        },
        error => {
          console.log(error);
        });
        this.retrieveModules();
  }
  
edit(currentModule:Output){
  this.moduleService.currentOutput=currentModule;
  this.moduleService.updatestr="UPDATE Module_Output SET Module_ID='?', Output_Filename = '?', Output_Notes = '?', LastUpdated='?' WHERE Output_ID = '?'";
  this.router.navigate(['/editOutput',currentModule.Output_ID]);
}

}
