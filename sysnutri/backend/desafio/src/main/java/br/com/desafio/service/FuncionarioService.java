package br.com.desafio.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import br.com.desafio.model.Funcionario;
import br.com.desafio.repository.FuncionarioRepository;
import br.com.desafio.specification.Conjunction;
import br.com.desafio.specification.FuncionarioSpecification;

@Service
public class FuncionarioService {
	
		@Autowired
		FuncionarioRepository funcionarioRepository; 		

		public Funcionario cadastrar(Funcionario Funcionario) {
			return funcionarioRepository.save(Funcionario);
		}

		public Collection<Funcionario> buscarTodos() {
			return funcionarioRepository.findAll();
		}
		
		public void excluir (Funcionario Funcionario){
			funcionarioRepository.delete(Funcionario);
		}
		
		public Funcionario buscarPorId(Integer id) {
			return funcionarioRepository.findOne(id);
		}
		
		public Funcionario alterar(Funcionario Funcionario){
			return funcionarioRepository.save(Funcionario);
		}
		
		public Collection<Funcionario> findByNome(String nome){
			Specification<Funcionario> specification = FuncionarioSpecification.findByNome(nome);
		    return funcionarioRepository.findAll(specification);
		}

		public Collection<Funcionario> findBySpecification(Conjunction<Funcionario> specification){			
		    return funcionarioRepository.findAll(specification);
		}
		
		public Boolean cpfCadastrado(String cpf) {
			return funcionarioRepository.cpfCadastrado(cpf);
		}
		
}
