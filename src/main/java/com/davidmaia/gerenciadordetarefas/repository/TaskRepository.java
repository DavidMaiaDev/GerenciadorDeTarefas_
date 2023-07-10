package com.davidmaia.gerenciadordetarefas.repository;

import com.davidmaia.gerenciadordetarefas.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByConcluida(boolean concluida);
}
