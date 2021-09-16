package br.com.desafio.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
import br.com.desafio.model.Agenda;
import br.com.desafio.service.AgendaService;
import br.com.desafio.specification.AgendaSpecification;
import br.com.desafio.specification.Conjunction;
import br.com.zenvia.client.exception.RestClientException;
import br.com.zenvia.client.response.SendSmsResponse;

@RestController
@RequestMapping("/api")
public class AgendaController {
	@Autowired
	AgendaService agendaService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/enviar-notificacao", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SendSmsResponse> enviarAgenda(@RequestBody Agenda agenda) throws RestClientException {
		SendSmsResponse smsEnviado = agendaService.sendSms(agenda);
		return new ResponseEntity<>(smsEnviado, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/notificacao/search", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Agenda>> search(
			@RequestParam(value="nome", required = false) String nome) throws ParseException {
		
		List<Agenda> agenda = agendaService.search(nome);
		
		return new ResponseEntity<>(agenda, HttpStatus.OK);

	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/agendas/search", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Agenda>> buscarNotificacoes(
			@RequestParam(value="nome", required = false) String nome,
			@RequestParam(value="dataNascimento", required = false) Date dataNascimento) throws ParseException {		
       		
		Conjunction<Agenda> specification = makeSpecification(nome, dataNascimento);
		
		Collection<Agenda> agenda = agendaService.findBySpecification(specification);
		
		return new ResponseEntity<>(agenda, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/agendas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Agenda> cadastrarAgenda(@RequestBody Agenda agenda) {

		Agenda agendaCadastrado = agendaService.cadastrar(agenda);
		return new ResponseEntity<>(agendaCadastrado, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/agendas", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Agenda>> buscarTodosAgendas() {

		Collection<Agenda> agendas = agendaService.buscarTodos();

		return new ResponseEntity<>(agendas, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/agendas/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Agenda> buscarAgendaPorId(@PathVariable Integer id) {
		Agenda agenda = agendaService.buscarPorId(id);
		return new ResponseEntity<>(agenda, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/agenda/{id}", produces = MediaType.APPLICATION_JSON_VALUE)	
	public ResponseEntity<Collection<Agenda>> searchAgendaByIdPaciente(@PathVariable Integer id) {		
		List<Agenda> agendas = agendaService.searchAgendaByIdPaciente(id);		
		return new ResponseEntity<>(agendas, HttpStatus.OK);
	}	
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/agendas/{id}" )
	public ResponseEntity<Agenda> excluirAgenda(@PathVariable Integer id) {
		
		Agenda agendaEncontrada = agendaService.buscarPorId(id);
		if (agendaEncontrada==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		agendaService.excluir(agendaEncontrada);
		return new ResponseEntity<>( HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/agendas/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Agenda> alterarAgenda(@PathVariable Integer id, @RequestBody Agenda agenda) {
		
		Agenda agendaEncontrada = agendaService.buscarPorId(id);
		if (agendaEncontrada==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		agenda.setConfirmacao("Consulta confirmada");
		
		agendaEncontrada = agendaService.alterar(agenda);
		return new ResponseEntity<>( HttpStatus.OK);
		
	}
	
	private Conjunction<Agenda> makeSpecification(String nome, Date dataNascimento) throws ParseException{
        List<Specification<Agenda>> specifications = new ArrayList<Specification<Agenda>>();

        if (StringUtils.isNotEmpty(nome)) {
        	specifications.add(AgendaSpecification.likeNome(nome));
        }
        
        if (dataNascimento != null) {        	        	
            specifications.add(AgendaSpecification.likeDataNasc(dataNascimento));
        }
        
        return new Conjunction<Agenda>(specifications);
    }

}
