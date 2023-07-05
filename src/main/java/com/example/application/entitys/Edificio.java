package com.example.application.entitys;

import java.util.HashSet;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Edificio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    
    @Column(nullable = false,unique = true, updatable = true)
    private String nombre;
    
    @Column(nullable = false, updatable = true)
    private String domicilio;

    @OneToMany(mappedBy = "edificio", cascade = CascadeType.ALL)
    private Set<Dependencia> dependencias = new HashSet<>();

    
    public Edificio() {
    }

    
    public Edificio(String nombre, String domicilio) {
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

     	public Set<Dependencia> getDependencia() {
		return dependencias;
	}
 
       public void setDependencias(Set<Dependencia> dependencias) {
		this.dependencias = dependencias;
		for(Dependencia dependencia : dependencias) {
			dependencia.setEdificio(this);
		}
	}
}
