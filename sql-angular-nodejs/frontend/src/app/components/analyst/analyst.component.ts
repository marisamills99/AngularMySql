import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import { Analyst } from 'src/app/models/analyst.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-analyst',
  templateUrl: './analyst.component.html',
  styleUrls: ['./analyst.component.css']
})
export class AnalystComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Analyst ID",  "Lastname" , "Firstname" ,"Org" , 'Phone Number' , 'Updated',"Edit"];
  modules?: Analyst[]=[];
  currentIndex = -1;
  searchText: string = '';
  previous: string = '';
  analyst_id=0;
  @HostListener('input') oninput() {
    this.searchItems();
}
  constructor(private router: Router, private moduleService: ModuleService,private cdRef: ChangeDetectorRef,private route: ActivatedRoute,) { }
  
  ngOnInit() {
    this.retrieveModules();
    if(this.route.snapshot.params.analyst_id){
      this.analyst_id=this.route.snapshot.params.analyst_id
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(7);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
  retrieveModules(): void {
    this.moduleService.getAnalysts()
      .subscribe(
        data => {
          this.modules = data;
          this.mdbTable.setDataSource(this.modules);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          console.log(error);
        });
        this.moduleService.createstr="INSERT INTO Analysts SET Analyst_Last = '?', Analyst_First = '?', Analyst_Org='?', Analyst_Phone='?', LastUpdated='?'";
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
    this.moduleService.delete(currentModule,"Analysts")
      .subscribe(
        data => {
          console.log(data);
          
        },
        error => {
          console.log(error);
        });
        this.retrieveModules();
  }
  edit(currentModule:Analyst){
    this.moduleService.currentAnalyst=currentModule
    this.moduleService.updatestr="UPDATE Analysts SET Analyst_Last = '?', Analyst_First = '?', Analyst_Org='?', Analyst_Phone='?', LastUpdated='?' WHERE Analyst_ID = '?'";
    this.router.navigate(['/editAnalyst',currentModule.Analyst_ID]);
  }
}
