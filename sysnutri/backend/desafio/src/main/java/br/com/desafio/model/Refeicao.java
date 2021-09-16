package br.com.desafio.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="tb_refeicao")
public class Refeicao implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_refeicao")
	private Integer id_refeicao;
	
	@Column(name="descricao")
	private String descricao;
	
	@Column(name="horario")
	private String horario;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="id_refeicao")
	private List<Alimento> alimentos;
	
	
	public Integer getId_refeicao() {
		return id_refeicao;
	}

	public void setId_refeicao(Integer id_refeicao) {
		this.id_refeicao = id_refeicao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	public List<Alimento> getAlimentos() {
		return alimentos;
	}

	public void setAlimentos(List<Alimento> alimentos) {
		this.alimentos = alimentos;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
	
}
