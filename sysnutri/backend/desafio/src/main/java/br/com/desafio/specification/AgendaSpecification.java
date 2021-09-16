package br.com.desafio.specification;

import java.util.Date;

import javax.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import br.com.desafio.model.Agenda;

public final class AgendaSpecification {
	
	private AgendaSpecification(){}
	
	public static Specification<Agenda> findByNome(String nome) {
		return new Specification<Agenda>() {
		      @Override
		      public Predicate toPredicate(Root<Agenda> root,
		          CriteriaQuery<?> query, CriteriaBuilder builder) {
		        return builder.like(root.<String>get("nome"), 
		            String.format("%s", nome.trim()));
		      }
		    };		
	}
	    
    public static Specification<Agenda> likeNome(String nome) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("nome")),
                    "%" + nome.toLowerCase() + "%");        
        };
    }
    
    
    public static Specification<Agenda> likeDataNasc(Date dataNascimento) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("dataNascimento")),
                    "%" + dataNascimento + "%");        
        };
    }

}
