package br.com.desafio.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name="tb_perfil")
public class Perfil implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_perfil")
	private Integer id;
	
	@Column(name="perfil")
	private String perfil;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}
		
}
