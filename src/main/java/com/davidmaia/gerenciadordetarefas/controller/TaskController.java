package com.davidmaia.gerenciadordetarefas.controller;



import com.davidmaia.gerenciadordetarefas.model.Task;
import com.davidmaia.gerenciadordetarefas.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    @Autowired
    TaskService taskService;

    //ESSA PARTE CRIA A TAREFA
    @CrossOrigin
    @PostMapping("/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }
    //ESSA PARTE LISTA TODAS AS TAREFAS (CONCLUÍDAS E NÃO CONCLUÍDAS)
    @CrossOrigin
    @GetMapping("/tasks")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getAllTasks() {
        return taskService.listAllTasks();
    }

    //ESSA PARTE BUSCA UMA TAREFA PELO ID, TITULO E RESPONSÁVEL
    @CrossOrigin(origins = "http://localhost:63342")
    @GetMapping("/tasks/buscar")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> searchTaskByCriteria(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String responsavel,
            @RequestParam(required = false) boolean status
    ) {
        return taskService.findTaskByCriteria(id, titulo, responsavel, status);
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @GetMapping("/tasks/buscarPorId")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> searchTaskByID(
            @RequestParam(required = true) Long id
    ) {
        return taskService.findTaskById(id);
    }

    //ESSA PARTE ATUALIZA/ EDITA UMA TAREFA JÁ CRIADA
    @CrossOrigin
    @PutMapping("/tasks/{id}/edita")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> updateTaskById(@PathVariable (value = "id") Long id, @RequestBody Task task) {
        return taskService.updateTaskById(task,id);
    }
    //ESSA PARTE DELETA UMA TAREFA ATRAVÉS DO ID
    @CrossOrigin
    @DeleteMapping("/tasks/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteTaskById(@PathVariable (value = "id") Long id) {
        return taskService.deleteById(id);
    }
    //ESSA PARTE LISTA AS TAREFAS QUE ESTÃO EM ANDAMENTO
    @CrossOrigin
    @GetMapping("/tasks/andamento")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getTarefasEmAndamento() {
        return taskService.listarTarefasEmAndamento();
    }
    //ESSA PARTE DIZ QUE UMA TAREFA JÁ FOI CONCLUÍDA, INFORMANDO O ID DELA
    @CrossOrigin
    @PutMapping("/tasks/{id}/concluida")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> concluirTarefa(@PathVariable(value = "id") Long id) {
        return taskService.concluirTarefa(id);
    }
    //ESSA PARTE LISTA AS TAREFAS QUE JÁ FORAM CONCLUÍDAS
    @CrossOrigin
    @GetMapping("/tasks/concluidas")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getTarefasConcluidas() {
        return taskService.listarTarefasConcluidas();
    }

}