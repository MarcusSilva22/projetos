package br.com.desafio.specification;

import java.util.Date;

import javax.persistence.criteria.Join;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import br.com.desafio.model.Acompanhamento;
import br.com.desafio.model.Paciente;

public final class AcompanhamentoSpecification {
	
	private AcompanhamentoSpecification(){}
		
    public static Specification<Acompanhamento> paciente(String nome) {
        return (root, query, cb) -> {
            Join<Acompanhamento, Paciente> join = root.join("paciente");
            return cb.like(join.<String>get("nome"), "%"+nome.toLowerCase()+"%");	        
        };
    }
	
	public static Specification<Acompanhamento> findByNome(String nome) {
		return new Specification<Acompanhamento>() {
		      @Override
		      public Predicate toPredicate(Root<Acompanhamento> root,
		          CriteriaQuery<?> query, CriteriaBuilder builder) {
		        return builder.like(root.<String>get("nome"), 
		            String.format("%s", nome.trim()));
		      }
		    };		
	}
	    
    public static Specification<Acompanhamento> likeNome(String nome) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("nome")),
                    "%" + nome.toLowerCase() + "%");        
        };
    }
    
    
    public static Specification<Acompanhamento> likeDataNasc(Date dataNascimento) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("dataNascimento")),
                    "%" + dataNascimento + "%");        
        };
    }

}
