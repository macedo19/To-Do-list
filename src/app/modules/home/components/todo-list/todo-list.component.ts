import { TaskList } from './../../model/task-list';
import { Component, DoCheck, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements DoCheck {

  //Pega a string e converte em objeto
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');
  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  //Detele apenas o item selecionado (obs deleta apenas um por vez)
  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  //Metodo para deletar todos os itens
  public deleteAllTaskList(){
    const confirm = window.confirm("Você deseja realmente deletar tudo?")
    if(confirm){
      this.taskList = [];
    }
  }

  //Metodo para salvar a task com seu checked desmarcado por default
  public setEmitTaskList(event : string){
    this.taskList.push({task: event, checked: false})
  }

  //Validar se o input esta vazio
  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja deletar?")

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  //Salvando os dados no Local Storage
  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort( (first, last) => Number( first.checked) - Number(last.checked) );
      //Localstroage , esse json converte os dados para uma string
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
