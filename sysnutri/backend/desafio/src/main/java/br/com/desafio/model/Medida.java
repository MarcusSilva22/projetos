package br.com.desafio.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name="tb_medida")
public class Medida implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_medida")
	private Integer id_medida;
	
	@Column(name="data")
	private Date data;
		
	@Column(name="peso")
	private Float peso;
	
	@Column(name="altura")
	private Float altura;
		
	@Column(name="circ_bracoD")
	private Float circ_bracoD;
	
	@Column(name="circ_bracoE")
	private Float circ_bracoE;
	
	@Column(name="circ_cintura")
	private Float circ_cintura;

	@Column(name="circ_abdominal")
	private Float circ_abdominal;
	
	@Column(name="circ_pernaD")
	private Float circ_pernaD;
	
	@Column(name="circ_pernaE")
	private Float circ_pernaE;
	
	@Column(name="circ_coxaD")
	private Float circ_coxaD;
	
	@Column(name="circ_coxaE")
	private Float circ_coxaE;
	
	@Column(name="dc_bicipital")
	private Float dc_bicipital;
	
	@Column(name="dc_tricipital")
	private Float dc_tricipital;
	
	@Column(name="dc_suprailiaca")
	private Float dc_suprailiaca;
	
	@Column(name="dc_supraEscapular")
	private Float dc_supraEscapular;

	public Integer getId_medida() {
		return id_medida;
	}

	public void setId_medida(Integer id_medida) {
		this.id_medida = id_medida;
	}
		
	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Float getPeso() {
		return peso;
	}

	public void setPeso(Float peso) {
		this.peso = peso;
	}

	public Float getAltura() {
		return altura;
	}

	public void setAltura(Float altura) {
		this.altura = altura;
	}

	public Float getCirc_bracoD() {
		return circ_bracoD;
	}

	public void setCirc_bracoD(Float circ_bracoD) {
		this.circ_bracoD = circ_bracoD;
	}

	public Float getCirc_bracoE() {
		return circ_bracoE;
	}

	public void setCirc_bracoE(Float circ_bracoE) {
		this.circ_bracoE = circ_bracoE;
	}

	public Float getCirc_cintura() {
		return circ_cintura;
	}

	public void setCirc_cintura(Float circ_cintura) {
		this.circ_cintura = circ_cintura;
	}

	public Float getCirc_abdominal() {
		return circ_abdominal;
	}

	public void setCirc_abdominal(Float circ_abdominal) {
		this.circ_abdominal = circ_abdominal;
	}

	public Float getCirc_pernaD() {
		return circ_pernaD;
	}

	public void setCirc_pernaD(Float circ_pernaD) {
		this.circ_pernaD = circ_pernaD;
	}

	public Float getCirc_pernaE() {
		return circ_pernaE;
	}

	public void setCirc_pernaE(Float circ_pernaE) {
		this.circ_pernaE = circ_pernaE;
	}

	public Float getCirc_coxaD() {
		return circ_coxaD;
	}

	public void setCirc_coxaD(Float circ_coxaD) {
		this.circ_coxaD = circ_coxaD;
	}

	public Float getCirc_coxaE() {
		return circ_coxaE;
	}

	public void setCirc_coxaE(Float circ_coxaE) {
		this.circ_coxaE = circ_coxaE;
	}

	public Float getDc_bicipital() {
		return dc_bicipital;
	}

	public void setDc_bicipital(Float dc_bicipital) {
		this.dc_bicipital = dc_bicipital;
	}

	public Float getDc_tricipital() {
		return dc_tricipital;
	}

	public void setDc_tricipital(Float dc_tricipital) {
		this.dc_tricipital = dc_tricipital;
	}

	public Float getDc_suprailiaca() {
		return dc_suprailiaca;
	}

	public void setDc_suprailiaca(Float dc_suprailiaca) {
		this.dc_suprailiaca = dc_suprailiaca;
	}

	public Float getDc_supraEscapular() {
		return dc_supraEscapular;
	}

	public void setDc_supraEscapular(Float dc_supraEscapular) {
		this.dc_supraEscapular = dc_supraEscapular;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
