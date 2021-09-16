package br.com.desafio.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.desafio.model.Acompanhamento;
import br.com.desafio.service.AcompanhamentoService;
import br.com.desafio.specification.AcompanhamentoSpecification;
import br.com.desafio.specification.Conjunction;

@RestController
@RequestMapping("/api")
public class AcompanhamentoController {
	@Autowired
	AcompanhamentoService acompanhamentoService;
	
	// End points
	@RequestMapping(method = RequestMethod.POST, value = "/acompanhamentos", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Acompanhamento> cadastrarAcompanhamento(@RequestBody Acompanhamento acompanhamento) {

		Acompanhamento acompanhamentoCadastrado = acompanhamentoService.cadastrar(acompanhamento);
		return new ResponseEntity<>(acompanhamentoCadastrado, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/acompanhamentos", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Acompanhamento>> buscarTodosAcompanhamentos() {

		Collection<Acompanhamento> acompanhamentos = acompanhamentoService.buscarTodos();

		return new ResponseEntity<>(acompanhamentos, HttpStatus.OK);
	}
		
	@RequestMapping(method = RequestMethod.GET, value = "/acompanhamentos/search", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Acompanhamento>> search(
			@RequestParam(value="nome", required = false) String nome) throws ParseException {
		
		List<Acompanhamento> acompanhamentos = acompanhamentoService.search(nome);		
		return new ResponseEntity<>(acompanhamentos, HttpStatus.OK);

	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/acompanhamento/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Acompanhamento> buscarPacientePorId(@PathVariable Integer id) {

		Acompanhamento acompanhamento = acompanhamentoService.getAcompanhamentosByIdPaciente(id);

		return new ResponseEntity<>(acompanhamento, HttpStatus.OK);
	}
	
	
	@RequestMapping(method = RequestMethod.GET, value = "/acompanhamentos/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Acompanhamento> buscarAcompanhamentoPorId(@PathVariable Integer id) {

		Acompanhamento acompanhamento = acompanhamentoService.buscarPorId(id);

		return new ResponseEntity<>(acompanhamento, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/acompanhamentos/{id}" )
	public ResponseEntity<Acompanhamento> excluirAcompanhamento(@PathVariable Integer id) {
		
		Acompanhamento acompanhamentoEncontrado = acompanhamentoService.buscarPorId(id);
		if (acompanhamentoEncontrado==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		acompanhamentoService.excluir(acompanhamentoEncontrado);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/acompanhamentos", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Acompanhamento> alterarAcompanhamento(@RequestBody Acompanhamento acompanhamento) {

		Acompanhamento acompanhamentoAlterado = acompanhamentoService.alterar(acompanhamento);
		return new ResponseEntity<>(acompanhamentoAlterado, HttpStatus.OK);
	}
	
    private Conjunction<Acompanhamento> makeSpecification(String nome) throws ParseException{
        List<Specification<Acompanhamento>> specifications = new ArrayList<Specification<Acompanhamento>>();

        if (StringUtils.isNotEmpty(nome)) {
            specifications.add(AcompanhamentoSpecification.likeNome(nome));
        }
        
        
        return new Conjunction<Acompanhamento>(specifications);
    }
	

}
