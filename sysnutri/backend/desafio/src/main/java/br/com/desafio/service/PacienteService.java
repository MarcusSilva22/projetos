package br.com.desafio.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import br.com.desafio.model.Paciente;
import br.com.desafio.repository.PacienteRepository;
import br.com.desafio.specification.Conjunction;
import br.com.desafio.specification.PacienteSpecification;

@Service
public class PacienteService {
	
		@Autowired
		PacienteRepository pacienteRepository; 		

		public Paciente cadastrar(Paciente paciente) {
			return pacienteRepository.save(paciente);
		}

		public Collection<Paciente> buscarTodos() {
			return pacienteRepository.findAll();
		}
		
		public void excluir (Paciente paciente){
			pacienteRepository.delete(paciente);
		}
		
		public Paciente buscarPorId(Integer id) {
			return pacienteRepository.findOne(id);
		}
		
		public Paciente alterar(Paciente paciente){
			return pacienteRepository.save(paciente);
		}
		
		public Collection<Paciente> findByNome(String nome){
			Specification<Paciente> specification = PacienteSpecification.findByNome(nome);
		    return pacienteRepository.findAll(specification);
		}
		
		public Collection<Paciente> findBySpecification(Conjunction<Paciente> specification){			
		    return pacienteRepository.findAll(specification);
		}
		
		public Boolean cpfCadastrado(String cpf) {
			return pacienteRepository.cpfCadastrado(cpf);
		}
}
