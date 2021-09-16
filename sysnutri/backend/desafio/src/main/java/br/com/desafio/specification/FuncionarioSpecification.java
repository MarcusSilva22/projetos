package br.com.desafio.specification;

import java.util.Date;

import javax.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import br.com.desafio.model.Funcionario;

public final class FuncionarioSpecification {
	
	private FuncionarioSpecification(){}
	
	public static Specification<Funcionario> findByNome(String nome) {
		return new Specification<Funcionario>() {
		      @Override
		      public Predicate toPredicate(Root<Funcionario> root,
		          CriteriaQuery<?> query, CriteriaBuilder builder) {
		        return builder.like(root.<String>get("nome"), 
		            String.format("%s", nome.trim()));
		      }
		    };		
	}
	    
    public static Specification<Funcionario> likeNome(String nome) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("nome")),
                    "%" + nome.toLowerCase() + "%");        
        };
    }
    
    
    public static Specification<Funcionario> likeDataNasc(Date dataNascimento) {
        return (root, query, cb) -> {
            return cb.like(
                    cb.lower(root.<String>get("dataNascimento")),
                    "%" + dataNascimento + "%");        
        };
    }

}
