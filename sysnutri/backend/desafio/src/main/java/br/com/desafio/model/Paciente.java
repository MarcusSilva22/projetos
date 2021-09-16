package br.com.desafio.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name="tb_paciente")
@PrimaryKeyJoinColumn(name="id")
public class Paciente extends Usuario implements Serializable {
	
	private static final long serialVersionUID = 35953318573591016L;
	
	@Column(name="nome")
	private String nome;
	
	@Column(name="dataNascimento")
	private Date dataNascimento;
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
