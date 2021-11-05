import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { ModuleService } from 'src/app/services/module.service';
import { Output } from 'src/app/models/output.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'

import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/models/module.model';
@Component({
  selector: 'app-multiple-table-view',
  templateUrl: './multiple-table-view.component.html',
  styleUrls: ['./multiple-table-view.component.css']
})
export class MultipleTableViewComponent implements OnInit {
  
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  outheadElements=[ "Output Id", "Output Filename","Output Notes"];
  inheadElements=["Input Id", "Input Filename","Input Notes"];
  inputs?: any;
  outputs:any;
  currentIndex = -1;
  searchText: string = '';
  previous: string = '';


  constructor(private moduleService: ModuleService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.retrieveModules(this.route.snapshot.params.module_id);
  }
  retrieveModules(id:any): void {
    this.moduleService.getMultipleTables(id)
      .subscribe(
        data => {
          console.log(data);
            this.outputs = data[1];
            this.inputs=data[0];
          // this.mdbTable.setDataSource(this.inputs);
          // this.previous = this.mdbTable.getDataSource();
        },
        error => {
          console.log(error);
        });
  }
  
}
