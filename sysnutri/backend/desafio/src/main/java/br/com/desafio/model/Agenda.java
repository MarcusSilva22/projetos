package br.com.desafio.model;

import java.io.Serializable;
import java.util.*;

import javax.persistence.*;

@Entity
@Table(name="tb_agenda")
public class Agenda implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name="horario")
	private Date horario;
	
	@Column(name="confirmacao")
	private String confirmacao;
	
	@ManyToOne
	private Funcionario funcionario;
	
	@ManyToOne	
	private Paciente paciente;
	
	@OneToOne(cascade=CascadeType.ALL)
	private Notificacao notificacao;

	public Notificacao getNotificacao() {
		return notificacao;
	}

	public void setNotificacao(Notificacao notificacao) {
		this.notificacao = notificacao;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getHorario() {
		return horario;
	}

	public void setHorario(Date horario) {
		this.horario = horario;
	}	

	public String getConfirmacao() {
		return confirmacao;
	}

	public void setConfirmacao(String confirmacao) {
		this.confirmacao = confirmacao;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}
	
		
}
