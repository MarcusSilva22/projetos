package br.com.desafio.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "tb_acompanhamento")
public class Acompanhamento implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_acompanhamento")
	private Integer id_acompanhamento;

	@OneToOne
	private Paciente paciente;

	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="id_acompanhamento")
	private List<Medida> medida;

	@OneToOne(cascade = CascadeType.ALL)
	private InformacoesPessoais infoPessoal;

	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="id_acompanhamento")
	private List<Refeicao> refeicao;

	public Integer getId_acompanhamento() {
		return id_acompanhamento;
	}

	public void setId_acompanhamento(Integer id_acompanhamento) {
		this.id_acompanhamento = id_acompanhamento;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public List<Medida> getMedida() {
		return medida;
	}

	public void setMedida(List<Medida> medida) {
		this.medida = medida;
	}

	public InformacoesPessoais getInfoPessoal() {
		return infoPessoal;
	}

	public void setInfoPessoal(InformacoesPessoais infoPessoal) {
		this.infoPessoal = infoPessoal;
	}

	public List<Refeicao> getRefeicao() {
		return refeicao;
	}

	public void setRefeicao(List<Refeicao> refeicao) {
		this.refeicao = refeicao;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

		
}