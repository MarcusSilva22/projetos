package br.com.desafio.model;

import javax.persistence.*;

@Entity
@Table(name="tb_alimento")
public class Alimento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_alimento")
	private Integer id_alimento;
	
	@Column(name="descricao")
	private String descricao;

	public Integer getId_alimento() {
		return id_alimento;
	}

	public void setId_alimento(Integer id_alimento) {
		this.id_alimento = id_alimento;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
}
