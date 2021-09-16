package br.com.desafio.model;



import java.io.Serializable;

import javax.persistence.*;

public class AlimentosSubstitutos implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_alimento_substituto")
	private Integer id_alimento_substituto;
	
	@Column(name="id_alimento")
	private Integer id_alimento;

	public Integer getId_alimento_substituto() {
		return id_alimento_substituto;
	}

	public void setId_alimento_substituto(Integer id_alimento_substituto) {
		this.id_alimento_substituto = id_alimento_substituto;
	}

	public Integer getId_alimento() {
		return id_alimento;
	}

	public void setId_alimento(Integer id_alimento) {
		this.id_alimento = id_alimento;
	}
	
}
