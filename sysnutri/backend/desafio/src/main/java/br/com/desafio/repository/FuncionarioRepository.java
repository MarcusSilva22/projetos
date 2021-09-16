package br.com.desafio.repository;


import java.io.Serializable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.desafio.model.Funcionario;

@Repository
public interface FuncionarioRepository extends CustomRepository<Funcionario, Serializable>{
	
    @Query("select count(f.cpf)>0 from Funcionario as f where f.cpf = :cpf")    
    Boolean cpfCadastrado(@Param("cpf") String cpf);
		
}

