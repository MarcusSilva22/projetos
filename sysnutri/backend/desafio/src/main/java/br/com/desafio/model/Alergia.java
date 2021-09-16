package br.com.desafio.model;

import javax.persistence.*;


@Entity
@Table(name="tb_alergia")
public class Alergia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_alergia")
	private Integer id_alergia;
	
	@Column(name="descricao")
	private String descricao;

	public Integer getId_alergia() {
		return id_alergia;
	}

	public void setId_alergia(Integer id_alergia) {
		this.id_alergia = id_alergia;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}	

}
