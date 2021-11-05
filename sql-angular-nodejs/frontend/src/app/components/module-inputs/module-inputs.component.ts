import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import { Input } from 'src/app/models/input.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { Module } from 'src/app/models/module.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-inputs',
  templateUrl: './module-inputs.component.html',
  styleUrls: ['./module-inputs.component.css']
})
export class ModuleInputsComponent implements OnInit {
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Input ID",  "Module ID" , "Input Filename" , 'Notes' , 'Updated','Edit'];
  modules?: Input[]= [];
  currentIndex = -1;
  searchText: string = '';
  previous: string = '';
  
  @HostListener('input') oninput() {
    this.searchItems();
}
  constructor(private moduleService: ModuleService,private cdRef: ChangeDetectorRef,
    private router: Router) { }
  
  ngOnInit() {
    this.retrieveModules();
    
  }
  ngAfterViewInit() {
    if (this.mdbTablePagination){
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(7);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    }
  }
  retrieveModules(): void {
    this.moduleService.getInput()
      .subscribe(
        data => {
          this.modules = data;
          this.mdbTable.setDataSource(this.modules);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          console.log(error);
        });
        this.moduleService.createstr="INSERT INTO Module_Input SET Module_ID='?',Input_Filename = '?', Input_Notes = '?', LastUpdated='?'"
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
    this.moduleService.delete(currentModule,"Module_Input")
      .subscribe(
        data => {
          console.log(data);
          
        },
        error => {
          console.log(error);
        });
        this.retrieveModules();
  }
  edit(currentModule:Input){
    this.moduleService.currentInput=currentModule
    this.router.navigate(['/editInput', currentModule.Input_ID])
  }
}
