import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModulesListComponent } from './components/modules-list/module-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleInputsComponent } from './components/module-inputs/module-inputs.component';
import { ModuleOutputComponent } from './components/module-output/module-output.component';
import { AnalystComponent } from './components/analyst/analyst.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { ModuleExecComponent } from './components/module-exec/module-exec.component';
import { ModuleNotesComponent } from './components/module-notes/module-notes.component';
import { WorkflowPathComponent } from './components/workflow-path/workflow-path.component';
import { MultipleTableViewComponent } from './components/multiple-table-view/multiple-table-view.component';
import { AddModuleComponent } from './components/add/add-module/add-module.component';
import { AddInputsComponent } from './components/add/add-inputs/add-inputs.component';
import { AddOutputsComponent } from './components/add/add-outputs/add-outputs.component';
import { AddAnalystComponent } from './components/add/add-analyst/add-analyst.component';
import { DatePipe } from '@angular/common';
import { AddWorkflowComponent } from './components/add/add-workflow/add-workflow.component';
import { AddNotesComponent } from './components/add/add-notes/add-notes.component';


@NgModule({
  declarations: [
    AppComponent,
    ModulesListComponent,
    ModuleInputsComponent,
    ModuleOutputComponent,
    AnalystComponent,
    WorkflowComponent,
    ModuleExecComponent,
    ModuleNotesComponent,
    WorkflowPathComponent,
    MultipleTableViewComponent,
    AddModuleComponent,
    AddInputsComponent,
    AddOutputsComponent,
    AddAnalystComponent,
    AddWorkflowComponent,
    AddNotesComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NoopAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
