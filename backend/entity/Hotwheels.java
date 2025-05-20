package com.projeto.hotwheels.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_hotwheels")
public class Hotwheels {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private LocalDate year;
	private String model;
	private String imgUrl;
	
	
	
	public Hotwheels() {
	}



	public Hotwheels(Long id, String name, LocalDate year, String model, String imgUrl) {
		this.id = id;
		this.name = name;
		this.year = year;
		this.model = model;
		this.imgUrl = imgUrl;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public LocalDate getYear() {
		return year;
	}



	public void setYear(LocalDate year) {
		this.year = year;
	}



	public String getModel() {
		return model;
	}



	public void setModel(String model) {
		this.model = model;
	}



	public String getImgUrl() {
		return imgUrl;
	}



	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	
	
}