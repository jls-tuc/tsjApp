package com.example.application.entitys;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class Dependencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
     
    @Column(nullable = false,unique = true, updatable = true)
    private String nombre;
    @Column(nullable = false, updatable = true)
    private String domicilio;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    
    @JoinColumn(name = "edificio_id")
    @JsonProperty(access = Access.WRITE_ONLY)
    private Edificio edificio;


    public Dependencia() {
    }

    
    public Dependencia(String nombre, String domicilio) {
        this.nombre = nombre;
        this.domicilio = domicilio;
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDomicilio() {
        return domicilio;
    }

   public void setDomicilio(String domicilio) {
            if (domicilio != null) {
        this.domicilio = domicilio;
    }
   }
    public Edificio getEdificio() {
        return edificio;
    }

    public void setEdificio(Edificio edificio) {
        this.edificio = edificio;
    }


   
}

