package br.com.desafio.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.desafio.model.Paciente;

@Repository
public interface PacienteRepository extends CustomRepository<Paciente, Serializable> {
    @Query("select count(p.cpf)>0 from Paciente as p where p.cpf = :cpf")    
    Boolean cpfCadastrado(@Param("cpf") String cpf);
}
