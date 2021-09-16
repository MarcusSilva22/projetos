package br.com.desafio.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import org.apache.commons.lang3.StringUtils;

import br.com.desafio.model.Funcionario;
import br.com.desafio.service.FuncionarioService;
import br.com.desafio.specification.Conjunction;
import br.com.desafio.specification.FuncionarioSpecification;
import groovyjarjarcommonscli.ParseException;

@RestController
@RequestMapping("/api")
public class FuncionarioController {
	@Autowired
	FuncionarioService funcionarioService;

	@RequestMapping(method = RequestMethod.POST, value = "/funcionarios", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Funcionario> cadastrarFuncionario(@RequestBody Funcionario funcionario) {

		Funcionario funcionarioCadastrado = funcionarioService.cadastrar(funcionario);
		return new ResponseEntity<>(funcionarioCadastrado, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/funcionarios/search", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Funcionario>> buscarFuncionarios(
			@RequestParam(value="nome", required = false) String nome,
			@RequestParam(value="dataNascimento", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataNascimento) throws ParseException {		
       		
		Conjunction<Funcionario> specification = makeSpecification(nome, dataNascimento);
		
		Collection<Funcionario> funcionariosBuscados = funcionarioService.findBySpecification(specification);
		
		return new ResponseEntity<>(funcionariosBuscados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/funcionarios/auto-complete/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Funcionario>> autoCompleteFuncionarios(@PathVariable String nome){		
       	
		String nomeFormatado = "%"+nome+"%";
		
		Collection<Funcionario> funcionariosBuscados = funcionarioService.findByNome(nomeFormatado);
		
		return new ResponseEntity<>(funcionariosBuscados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/funcionarios/validacao-cpf/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Funcionario> buscarFuncionarioCpf(@PathVariable String cpf) {
		
		Boolean cpfCadastrado = funcionarioService.cpfCadastrado(cpf);
		
		if(!cpfCadastrado){
			return new ResponseEntity<Funcionario>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Funcionario>(HttpStatus.CONFLICT);
	}
		

	@RequestMapping(method = RequestMethod.GET, value = "/funcionarios", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Funcionario>> buscarTodosFuncionarios() {

		Collection<Funcionario> funcionariosBuscados = funcionarioService.buscarTodos();

		return new ResponseEntity<>(funcionariosBuscados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/funcionarios/{id}" )
	public ResponseEntity<Funcionario> excluirFuncionario(@PathVariable Integer id) {
		
		Funcionario funcionarioEncontrado = funcionarioService.buscarPorId(id);
		if (funcionarioEncontrado==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		funcionarioService.excluir(funcionarioEncontrado);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/funcionarios/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Funcionario> alterarFuncionario(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
		Funcionario funcionarioEncontrado = funcionarioService.buscarPorId(id);
		funcionarioEncontrado = funcionarioService.alterar(funcionario);
		return new ResponseEntity<>(funcionarioEncontrado, HttpStatus.OK);
	}
	
    private Conjunction<Funcionario> makeSpecification(String nome, Date dataNascimento) throws ParseException{
        List<Specification<Funcionario>> specifications = new ArrayList<Specification<Funcionario>>();

        if (StringUtils.isNotEmpty(nome)) {
            specifications.add(FuncionarioSpecification.likeNome(nome));
        }
        
        if (dataNascimento != null) {        	        	
            specifications.add(FuncionarioSpecification.likeDataNasc(dataNascimento));
        }
        
        return new Conjunction<Funcionario>(specifications);
    }

}
