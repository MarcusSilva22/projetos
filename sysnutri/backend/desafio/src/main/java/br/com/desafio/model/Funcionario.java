package br.com.desafio.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name="tb_funcionario")
@PrimaryKeyJoinColumn(name="id")
public class Funcionario extends Usuario implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name="nome")
	private String nome;
		
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="dataNascimento")
	private Date dataNascimento;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="dataAdmissao")	
	private Date dataAdmissao;
	
	@Column(name="tipoProfissional")
	private String tipoProfissional;
		
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
	

	public Date getDataAdmissao() {
		return dataAdmissao;
	}

	public void setDataAdmissao(Date dataAdmissao) {
		this.dataAdmissao = dataAdmissao;
	}

	public String getTipoProfissional() {
		return tipoProfissional;
	}

	public void setTipoProfissional(String tipoProfissional) {
		this.tipoProfissional = tipoProfissional;
	}
		
}
