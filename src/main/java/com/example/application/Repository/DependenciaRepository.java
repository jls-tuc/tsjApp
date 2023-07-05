package com.example.application.Repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.example.application.entitys.Dependencia;

public interface DependenciaRepository extends JpaRepository<Dependencia, Long> {
  
}

