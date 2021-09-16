package br.com.desafio.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="tb_informacao_pessoal")
public class InformacoesPessoais {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_info_pessoal")
	private Integer id_info_pessoal;
	
	@Column(name="motivacao")
	private String motivacao;
	
	@Column(name="expectativa")
	private String expectativa;
	
	@Column(name="comportamento_alimentar")
	private String comportamento_alimentar;
	
	@Column(name="funcao_intestinal")
	private String funcao_intestinal;
	
	@Column(name="qualidade_sono")
	private Integer qualidade_sono;
	
	@Column(name="atv_fisica")
	private Integer atv_fisica;
	
	@Column(name="ingestaoAgua")
	private Integer ingestaoAgua;
		
	@Column(name="alcool")
	private Boolean alcool;	
	
	@Column(name="fumante")
	private Boolean fumante;
	
	@Column(name="horaAcorda")
	private Date horaAcorda;
	
	@Column(name="horaDorme")
	private Date horaDorme;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="id_alimentopreferido")
	private List<Alimento> alimentosPreferidos;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="id_alimentoN")
	private List<Alimento> alimentosNaoAceitos;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="id_info_pessoal")
	private List<Alergia> alergiaIntolerancia;

	public Integer getId_info_pessoal() {
		return id_info_pessoal;
	}

	public void setId_info_pessoal(Integer id_info_pessoal) {
		this.id_info_pessoal = id_info_pessoal;
	}

	public String getMotivacao() {
		return motivacao;
	}

	public void setMotivacao(String motivacao) {
		this.motivacao = motivacao;
	}

	public String getExpectativa() {
		return expectativa;
	}

	public void setExpectativa(String expectativa) {
		this.expectativa = expectativa;
	}

	public String getComportamento_alimentar() {
		return comportamento_alimentar;
	}

	public void setComportamento_alimentar(String comportamento_alimentar) {
		this.comportamento_alimentar = comportamento_alimentar;
	}

	public String getFuncao_intestinal() {
		return funcao_intestinal;
	}

	public void setFuncao_intestinal(String funcao_intestinal) {
		this.funcao_intestinal = funcao_intestinal;
	}

	public Integer getQualidade_sono() {
		return qualidade_sono;
	}

	public void setQualidade_sono(Integer qualidade_sono) {
		this.qualidade_sono = qualidade_sono;
	}

	public Integer getAtv_fisica() {
		return atv_fisica;
	}

	public void setAtv_fisica(Integer atv_fisica) {
		this.atv_fisica = atv_fisica;
	}

	public Integer getIngestaoAgua() {
		return ingestaoAgua;
	}

	public void setIngestaoAgua(Integer ingestaoAgua) {
		this.ingestaoAgua = ingestaoAgua;
	}

	public Boolean getAlcool() {
		return alcool;
	}

	public void setAlcool(Boolean alcool) {
		this.alcool = alcool;
	}

	public Boolean getFumante() {
		return fumante;
	}

	public void setFumante(Boolean fumante) {
		this.fumante = fumante;
	}

	public Date getHoraAcorda() {
		return horaAcorda;
	}

	public void setHoraAcorda(Date horaAcorda) {
		this.horaAcorda = horaAcorda;
	}

	public Date getHoraDorme() {
		return horaDorme;
	}

	public void setHoraDorme(Date horaDorme) {
		this.horaDorme = horaDorme;
	}

	public List<Alimento> getAlimentosPreferidos() {
		return alimentosPreferidos;
	}

	public void setAlimentosPreferidos(List<Alimento> alimentosPreferidos) {
		this.alimentosPreferidos = alimentosPreferidos;
	}

	public List<Alimento> getAlimentosNaoAceitos() {
		return alimentosNaoAceitos;
	}

	public void setAlimentosNaoAceitos(List<Alimento> alimentosNaoAceitos) {
		this.alimentosNaoAceitos = alimentosNaoAceitos;
	}

	public List<Alergia> getAlergiaIntolerancia() {
		return alergiaIntolerancia;
	}

	public void setAlergiaIntolerancia(List<Alergia> alergiaIntolerancia) {
		this.alergiaIntolerancia = alergiaIntolerancia;
	}	
		
}
