package com.example.application.endpoints;


import com.example.application.Repository.DependenciaRepository;

import com.example.application.entitys.Dependencia;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;

import java.util.List;
import java.util.Optional;





@Endpoint
@AnonymousAllowed
public class DependenciasEndPoint {
    private DependenciaRepository depeRepository;
  

    DependenciasEndPoint(DependenciaRepository depeRepository){
        this.depeRepository = depeRepository;
    
    }
    public List<Dependencia> findAll() {

        return depeRepository.findAll();
    } 

    public Dependencia add(Dependencia dependencia){
     return depeRepository.save(dependencia);
    }

   

    public Dependencia update(Dependencia dependencia) {
        return depeRepository.save(dependencia);
    }
     public  Dependencia deleteDependencia(Dependencia dependencia){

      Optional<Dependencia>dependenciaSelect = depeRepository.findById((dependencia.id));
      if(!dependenciaSelect.isPresent()){
        
      }
      depeRepository.deleteById((dependencia.id));
     
       return dependencia;
     
    } 

}