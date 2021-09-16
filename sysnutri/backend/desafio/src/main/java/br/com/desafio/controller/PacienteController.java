package br.com.desafio.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import br.com.desafio.model.Paciente;
import br.com.desafio.service.PacienteService;
import br.com.desafio.specification.Conjunction;
import br.com.desafio.specification.PacienteSpecification;

@RestController
@RequestMapping("/api")
public class PacienteController {
	@Autowired
	PacienteService pacienteService;

	@RequestMapping(method = RequestMethod.POST, value = "/pacientes", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Paciente> cadastrarPaciente(@RequestBody Paciente paciente) {

		Paciente pacienteCadastrado = pacienteService.cadastrar(paciente);
		return new ResponseEntity<>(pacienteCadastrado, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/pacientes", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Paciente>> buscarTodosPacientes() {

		Collection<Paciente> pacientesBuscados = pacienteService.buscarTodos();

		return new ResponseEntity<>(pacientesBuscados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pacientes/search", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Paciente>> buscarPacientes(
			@RequestParam(value="nome", required = false) String nome,
			@RequestParam(value="dataNascimento", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataNascimento) throws ParseException {		
       		
		Conjunction<Paciente> specification = makeSpecification(nome, dataNascimento);
		
		Collection<Paciente> pacientesBuscados = pacienteService.findBySpecification(specification);
		
		return new ResponseEntity<>(pacientesBuscados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pacientes/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Paciente> buscarPacientePorId(@PathVariable Integer id) {

		Paciente paciente = pacienteService.buscarPorId(id);

		return new ResponseEntity<>(paciente, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pacientes/auto-complete/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Paciente>> autoCompletePacientes(@PathVariable String nome){		
       	
		String nomeFormatado = "%"+nome+"%";
		
		Collection<Paciente> pacientesBuscados = pacienteService.findByNome(nomeFormatado);
		
		return new ResponseEntity<>(pacientesBuscados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/pacientes/validacao-cpf/{cpf}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Paciente> buscarPacienteCpf(@PathVariable String cpf) {
		
		Boolean cpfCadastrado = pacienteService.cpfCadastrado(cpf);
		
		if(!cpfCadastrado){
			return new ResponseEntity<Paciente>(HttpStatus.OK);
		}
		
		return new ResponseEntity<Paciente>(HttpStatus.CONFLICT);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/pacientes/{id}" )
	public ResponseEntity<Paciente> excluirPaciente(@PathVariable Integer id) {
		
		Paciente pacienteEncontrado = pacienteService.buscarPorId(id);
		if (pacienteEncontrado==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		pacienteService.excluir(pacienteEncontrado);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/pacientes/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Paciente> alterarPaciente(@PathVariable Integer id, @RequestBody Paciente paciente) {
		
		Paciente pacienteEncontrado = pacienteService.buscarPorId(id);
		if (pacienteEncontrado==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		pacienteEncontrado = pacienteService.alterar(paciente);
		return new ResponseEntity<>(pacienteEncontrado, HttpStatus.OK);
	}
	
    private Conjunction<Paciente> makeSpecification(String nome, Date dataNascimento) throws ParseException{
        List<Specification<Paciente>> specifications = new ArrayList<Specification<Paciente>>();

        if (StringUtils.isNotEmpty(nome)) {
            specifications.add(PacienteSpecification.likeNome(nome));
        }
        
        if (dataNascimento != null) {        	        	
            specifications.add(PacienteSpecification.likeDataNasc(dataNascimento));
        }
        
        return new Conjunction<Paciente>(specifications);
    }

}
