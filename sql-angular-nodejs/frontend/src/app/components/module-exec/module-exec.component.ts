import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { ModuleService } from 'src/app/services/module.service';
import { Input } from 'src/app/models/input.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'

@Component({
  selector: 'app-module-exec',
  templateUrl: './module-exec.component.html',
  styleUrls: ['./module-exec.component.css']
})
export class ModuleExecComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Execution ID",  "Module ID" , "Last Execution" , 'Build' , 'Analyst ID', 'VM' , 'Time','Notes','Edit'];
  modules?: Input[]=[];
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
    this.moduleService.getExec()
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

}
