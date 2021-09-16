package br.com.desafio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.desafio.model.Agenda;

@Repository
public interface AgendaRepository extends CustomRepository<Agenda,Integer> {
	
	@Query("SELECT a FROM Agenda a JOIN a.paciente p WHERE UPPER(p.nome) LIKE UPPER(:nome)")
	List<Agenda> searchNotificacao(@Param("nome") String nome);
	
	@Query("SELECT a FROM Agenda a JOIN a.paciente p WHERE p.id  = :id ORDER BY a.horario")
	List<Agenda> searchAgendaByIdPaciente(@Param("id") Integer id);
	
}
