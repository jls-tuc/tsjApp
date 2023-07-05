package com.example.application.endpoints;
import java.util.List;
import java.util.Optional;
import com.example.application.Repository.EdificioRepository;
import com.example.application.entitys.Edificio;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class EdificiosEndPoint {
    private EdificioRepository ediRepository;

    EdificiosEndPoint(EdificioRepository ediRepository){
        this.ediRepository = ediRepository;
    }

    public List<Edificio> findAll() {
            return ediRepository.findAll();
    } 

    public Edificio add(Edificio edificio) {
        return ediRepository.save(edificio);
    }

      public Optional<Edificio> update(Edificio edificio) {
        ediRepository.save(edificio);
        return ediRepository.findById((edificio.id));
    }

    public  Edificio deleteEdificio(Edificio edificio){

      Optional<Edificio>edificioSelect = ediRepository.findById((edificio.id));
      if(!edificioSelect.isPresent()){
        
      }
      ediRepository.deleteById((edificio.id));
     
       return edificio;
     
    } 



}
