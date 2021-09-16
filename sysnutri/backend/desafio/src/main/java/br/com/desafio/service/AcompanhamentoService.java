package br.com.desafio.service;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import br.com.desafio.model.Acompanhamento;
import br.com.desafio.repository.AcompanhamentoRepository;
import br.com.desafio.specification.AcompanhamentoSpecification;
import br.com.desafio.specification.Conjunction;

@Service
public class AcompanhamentoService {
	
		@Autowired
		AcompanhamentoRepository acompanhamentoRepository; 		

		public Acompanhamento cadastrar(Acompanhamento acompanhamento) {
			return acompanhamentoRepository.save(acompanhamento);
		}

		public Collection<Acompanhamento> buscarTodos() {
			return acompanhamentoRepository.findAll();
		}
		
		public void excluir (Acompanhamento acompanhamento){
			acompanhamentoRepository.delete(acompanhamento);
		}
		
		public Acompanhamento buscarPorId(Integer id) {
			return acompanhamentoRepository.findOne(id);
		}
		
		public Acompanhamento alterar(Acompanhamento acompanhamento){
			return acompanhamentoRepository.save(acompanhamento);
		}
		
		public Collection<Acompanhamento> findBySpecification(Conjunction<Acompanhamento> specification){					
			return acompanhamentoRepository.findAll(specification);
		}
		
		public List<Acompanhamento> search(String nome){			
		//	acompanhamentoRepository.findAcompanhamentoByPaciente_nomeLikeIgnoreCase(nome);
		    return acompanhamentoRepository.getAcompanhamentosByName("%"+ nome +"%");
		}
		
		public Acompanhamento getAcompanhamentosByIdPaciente(Integer id){
		    return acompanhamentoRepository.getAcompanhamentosByIdPaciente(id);
		}
}
