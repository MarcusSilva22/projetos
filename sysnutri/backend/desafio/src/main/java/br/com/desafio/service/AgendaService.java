package br.com.desafio.service;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.desafio.model.Agenda;
import br.com.desafio.repository.AgendaRepository;
import br.com.desafio.specification.Conjunction;
import br.com.zenvia.client.RestClient;
import br.com.zenvia.client.enums.CallbackOption;
import br.com.zenvia.client.exception.RestClientException;
import br.com.zenvia.client.request.SingleMessageSms;
import br.com.zenvia.client.response.SendSmsResponse;

@Service
public class AgendaService {
	
		@Autowired
		AgendaRepository agendaRepository;
		
		public Agenda cadastrar(Agenda agenda) {
			return agendaRepository.save(agenda);
		}

		public Collection<Agenda> buscarTodos() {
			return agendaRepository.findAll();
		}
		
		public void excluir (Agenda agenda){
			agendaRepository.delete(agenda);
		}
		
		public Agenda buscarPorId(Integer id) {
			return agendaRepository.findOne(id);
		}
		
		public Agenda alterar(Agenda agenda){
			return agendaRepository.save(agenda);
		}
		
		public List<Agenda> searchAgendaByIdPaciente(Integer id) {
			return agendaRepository.searchAgendaByIdPaciente(id);
		}
		
		public Collection<Agenda> findBySpecification(Conjunction<Agenda> specification){			
		    return agendaRepository.findAll(specification);
		}
		
		public List<Agenda> search(String nome){
		    return agendaRepository.searchNotificacao("%"+ nome +"%");
		}
		
		public SendSmsResponse sendSms(Agenda agenda) throws RestClientException {
			
				RestClient client = new RestClient();
				
				client.setUsername("marcelobruno.api");
				client.setPassword("N4wj1a5IqA");
				
				SingleMessageSms messageSms = new SingleMessageSms();
							
				messageSms.setFrom(agenda.getPaciente().getNome());
				messageSms.setMsg(agenda.getNotificacao().getMensagem());
				messageSms.setTo("55"+agenda.getPaciente().getTelefones().get(1).getTelefone());
				messageSms.setCallbackOption(CallbackOption.ALL);
				messageSms.setExpiryDate(new Date());
				messageSms.setAggregatorId(agenda.getNotificacao().getId());
				
				System.out.println(messageSms.getFrom());
				System.out.println(messageSms.getMsg());
				System.out.println(messageSms.getTo());
				System.out.println(messageSms.getAggregatorId());
				
											
				SendSmsResponse sendSmsResponse = client.sendSms(messageSms);
				return sendSmsResponse;

			}

}
