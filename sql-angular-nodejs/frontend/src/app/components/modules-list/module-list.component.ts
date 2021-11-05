import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild, OnChanges } from '@angular/core';

import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/app/models/module.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModulesListComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Module ID",  "Module Name" , "Description",   "Purpose", "Module Category" ,"Last Build" , "Last Execution" , "ksh(s)","Update","Delete"]
  modules?: Module[]= [];
  currentIndex :any;
  searchText: string = '';
  previous: string = '';
  module_id=0;

  newModule: Module={
    Module_ID : '',
    ModuleName : '',
    DescrName : '',
    Purpose : '',
    ModuleCategory : '',
    Nbr_ksh : ''
  };
  @HostListener('input') oninput() {
    this.searchItems();
}
  constructor(private moduleService: ModuleService,private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.retrieveModules();
    if(this.route.snapshot.params.module_id){
      this.module_id=this.route.snapshot.params.module_id
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(7);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
    
  }
  retrieveModules() {
    this.moduleService.getAll()
      .subscribe(
        data => {
          this.modules = data;
          this.mdbTable.setDataSource(this.modules);
          this.previous = this.mdbTable.getDataSource();
          return this.previous;
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
    this.moduleService.delete(currentModule,"Modules")
      .subscribe(
        data => {
          console.log(data);
          
        },
        error => {
          console.log(error);
        });
        this.retrieveModules();
  }
  edit(currentModule:Module){
    this.moduleService.currentModule=currentModule;
    this.router.navigate(['/edit', currentModule.Module_ID]);
  }
}
