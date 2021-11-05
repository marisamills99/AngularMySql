import { ChangeDetectorRef, AfterViewInit,Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import { Input } from 'src/app/models/input.model';
import {MdbTableDirective,MdbTablePaginationComponent} from '../../../../node_modules/angular-bootstrap-md'
import { Notes } from 'src/app/models/note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-notes',
  templateUrl: './module-notes.component.html',
  styleUrls: ['./module-notes.component.css']
})
export class ModuleNotesComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  headElements=["Notes ID",  "Module ID" , "Analyst Id" , 'Notes' ,'Date Entered' ,  'Edit'];
  modules?: Input[]=[];
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
    this.moduleService.getNotes()
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
  edit(currentModule:Notes){
    this.moduleService.currentNotes=currentModule;
    this.moduleService.updatestr="UPDATE Module_Notes SET Module_ID='?', Analyst_ID= '?',AnalystNotes= '?', Date_Entered= '?' WHERE Notes_ID = '?' "
    this.router.navigate(['/editNotes',currentModule.Notes_ID]);
  }

}
