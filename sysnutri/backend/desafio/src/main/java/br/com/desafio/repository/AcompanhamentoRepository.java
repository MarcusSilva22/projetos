package br.com.desafio.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.desafio.model.Acompanhamento;

@Repository
public interface AcompanhamentoRepository extends CustomRepository<Acompanhamento,Integer> {
	
	
	@Query("SELECT a FROM Acompanhamento a JOIN a.paciente p WHERE UPPER(p.nome) LIKE UPPER(:nome)")
	List<Acompanhamento> getAcompanhamentosByName(@Param("nome") String nome);
	
	@Query("SELECT a FROM Acompanhamento a JOIN a.paciente p WHERE p.id = :id")
	Acompanhamento getAcompanhamentosByIdPaciente(@Param("id") Integer id);
	
		
	List<Acompanhamento> findAcompanhamentoByPaciente_nomeLikeIgnoreCase(String nome);
	
}
