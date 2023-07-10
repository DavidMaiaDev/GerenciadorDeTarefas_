package com.davidmaia.gerenciadordetarefas.service;

import com.davidmaia.gerenciadordetarefas.model.Task;
import com.davidmaia.gerenciadordetarefas.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    private List<Task> tarefasEmAndamento = new ArrayList<>();
    private List<Task> tarefasConcluidas = new ArrayList<>();

    public Task createTask(Task task){
        task.setConcluida(false);
        return taskRepository.save(task);
    }


    public List<Task> listAllTasks(){
        return taskRepository.findAll();
    }

    public ResponseEntity<Task> findTaskByCriteria(Long id, String titulo, String responsavel, boolean status) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();

            // Verificar se os critérios de busca correspondem aos valores da tarefa
            boolean tituloMatches = titulo == null || task.getTitulo().equalsIgnoreCase(titulo);
            boolean responsavelMatches = responsavel == null || task.getResponsavel().equalsIgnoreCase(responsavel);
            boolean statusMatches = task.isConcluida() == status;

            if (tituloMatches && responsavelMatches && statusMatches) {
                return ResponseEntity.ok().body(task);
            }
        }

        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Task> findTaskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(task -> ResponseEntity.ok().body(task)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<Task> updateTaskById(Task task, Long id){
        return taskRepository.findById(id)
                .map(taskToUpdate ->{
                    taskToUpdate.setTitulo(task.getTitulo());
                    taskToUpdate.setDescricao(task.getDescricao());
                    Task updated = taskRepository.save(taskToUpdate);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<Object> deleteById(Long id){
        return taskRepository.findById(id)
                .map(taskToDelete -> {
                    taskRepository.deleteById(id);
                    return ResponseEntity.noContent().build();
                }).orElse(ResponseEntity.notFound().build());

    }
    public List<Task> listarTarefasEmAndamento() {
        return taskRepository.findByConcluida(false);
    }



    public ResponseEntity<Task> concluirTarefa(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setConcluida(true); // Define o status como "concluída"
            Task updatedTask = taskRepository.save(task);

            // Remover a tarefa da lista de tarefas em andamento
            tarefasEmAndamento.remove(task);

            // Adicionar a tarefa à lista de tarefas concluídas
            tarefasConcluidas.add(task);

            return ResponseEntity.ok().body(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    public List<Task> listarTarefasConcluidas() {
        return taskRepository.findByConcluida(true);
    }





}
