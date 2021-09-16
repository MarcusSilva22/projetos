package br.com.desafio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.desafio.model.InformacoesPessoais;


@Repository
public interface InformacoesPessoaisRepository extends JpaRepository<InformacoesPessoais,Integer> {
	
}
