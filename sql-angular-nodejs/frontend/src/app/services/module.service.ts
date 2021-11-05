import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Module} from '../models/module.model'
import { Analyst } from '../models/analyst.model';
import { Workflow } from '../models/workflow.model';
import { Input } from '../models/input.model';
import { Output } from '../models/output.model';
import { Notes } from '../models/note.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  updatestr: string='';
  createstr:string='';

  currentModule:Module={};
  currentInput:Input={};
  currentOutput:Output={};
  currentAnalyst:Analyst={};
  currentWorkflow:Workflow={};
  currentNotes:Notes={};
  constructor(private http: HttpClient) { }

  getAll(): Observable<Module[]> {
    return this.http.get<Module[]>(`${baseUrl}/modules`);
  }
  getInput(): Observable<Module[]> {
    return this.http.get<Module[]>(`${baseUrl}/module_input`);
  }
  getOutput(): Observable<Module[]> {
    return this.http.get<Module[]>(`${baseUrl}/module_output`);
  }
  getAnalysts(): Observable<Analyst[]> {
    return this.http.get<Analyst[]>(`${baseUrl}/analysts`);
  }
  getWorkflow(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${baseUrl}/workflow`);
  }
  getNotes(): Observable<Module[]> {
    return this.http.get<Module[]>(`${baseUrl}/notes`);
  }
  getWorkflowPath(): Observable<Module[]> {
    return this.http.get<Module[]>(`${baseUrl}/workflowpath`);
  }
  getExec(): Observable<Module[]> {
    return this.http.get<Module[]>(`${baseUrl}/exec`);
  }
  getMultipleTables(id :any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/modules/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/modules`, data);
  }
  createNew(data: string): Observable<any> {
    const body = { query: data };
    return this.http.post(`${baseUrl}/any`, body);
  }
  delete(id :any,table_name:any): Observable<any> {
    return this.http.delete(`${baseUrl}/modules/${id}/${table_name}`);
  }
  update(id :any,data:any): Observable<any> {
    return this.http.put(`${baseUrl}/modules/${id}`,data);
  }
  updateInput(id :any,data:any): Observable<any> {
    return this.http.put(`${baseUrl}/module_input/${id}`,data);
  }
  updateAny(id :any,data:string): Observable<any> {
    const body = { query: data };
    return this.http.put(`${baseUrl}/any/${id}`,body);
  }
}