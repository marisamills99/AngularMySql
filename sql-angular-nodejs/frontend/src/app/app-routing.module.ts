import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesListComponent } from './components/modules-list/module-list.component';
import { ModuleInputsComponent } from './components/module-inputs/module-inputs.component';
import {ModuleOutputComponent} from './components/module-output/module-output.component';
import {AnalystComponent} from './components/analyst/analyst.component';
import {WorkflowComponent} from './components/workflow/workflow.component';
import { ModuleNotesComponent } from './components/module-notes/module-notes.component';
import { ModuleExecComponent } from './components/module-exec/module-exec.component';
import { WorkflowPathComponent } from './components/workflow-path/workflow-path.component';
import { MultipleTableViewComponent } from './components/multiple-table-view/multiple-table-view.component';
import { AddModuleComponent } from './components/add/add-module/add-module.component';
import { AddInputsComponent } from './components/add/add-inputs/add-inputs.component';
import { AddOutputsComponent } from './components/add/add-outputs/add-outputs.component';
import { AddAnalystComponent } from './components/add/add-analyst/add-analyst.component';
import { AddWorkflowComponent } from './components/add/add-workflow/add-workflow.component';
import { AddNotesComponent } from './components/add/add-notes/add-notes.component';


const routes: Routes = [
  { path: '', redirectTo: 'modules', pathMatch: 'full' },
  { path: 'modules', component: ModulesListComponent },
  { path: 'modules/:module_id', component: ModulesListComponent },
  { path: 'module/:module_id', component: MultipleTableViewComponent },
  { path: 'inputs', component: ModuleInputsComponent },
  { path: 'outputs', component: ModuleOutputComponent },
  { path: 'workflow', component: WorkflowComponent },
  { path: 'workflow/:workflow_id', component: WorkflowComponent },
  { path: 'analysts', component: AnalystComponent },
  { path: 'analysts/:analyst_id', component: AnalystComponent },
  { path: 'notes', component: ModuleNotesComponent },
  { path: 'exec', component: ModuleExecComponent },
  { path: 'workflowpath', component: WorkflowPathComponent },
  { path: 'add', component: AddModuleComponent },
  { path: 'edit/:module_id', component: AddModuleComponent },
  { path: 'editInput/:module_id', component: AddInputsComponent },
  { path: 'editOutput/:module_id', component: AddOutputsComponent },
  { path: 'editAnalyst/:module_id', component: AddAnalystComponent },
  { path: 'editWorkflow/:module_id', component: AddWorkflowComponent },
  { path: 'editNotes/:module_id', component: AddNotesComponent },
  { path: 'addInput', component: AddInputsComponent },
  { path: 'addOutput', component: AddOutputsComponent },
  { path: 'addAnalyst', component: AddAnalystComponent },
  { path: 'addWorkflow', component: AddWorkflowComponent },
  { path: 'addNotes', component: AddNotesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }