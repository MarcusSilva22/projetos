package br.com.desafio.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import br.com.desafio.model.Paciente;

public final class PacienteSpecification {
	
	private PacienteSpecification(){}
	
	
	public static Specification<Paciente> findByNome(String nome) {
		return new Specification<Paciente>() {
		      @Override
		      public Predicate toPredicate(Root<Paciente> root,
		          CriteriaQuery<?> query, CriteriaBuilder builder) {
		        return builder.like(root.<String>get("nome"), 
		            String.format("%s", nome.trim()));
		      }
		    };		
	}
	    
    public static Specification<Paciente> likeNome(String nome) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("nome")),
                    "%" + nome.toLowerCase() + "%");        
        };
    }
    
    
    public static Specification<Paciente> likeDataNasc(Date dataNascimento) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("dataNascimento")),
                    "%" + dataNascimento + "%");        
        };
    }

}
