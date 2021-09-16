package br.com.desafio.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name="tb_telefone")
public class Telefone implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name="id_telefone")
	private Integer id_telefone;
	
	@Column(name="telefone")
	private String telefone;
	
	public Integer getId_telefone() {
		return id_telefone;
	}

	public void setId_telefone(Integer id_telefone) {
		this.id_telefone = id_telefone;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
		
}
