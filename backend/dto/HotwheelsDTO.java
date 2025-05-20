package com.projeto.hotwheels.dto;

import java.time.LocalDate;

import com.projeto.hotwheels.entity.Hotwheels;

public class HotwheelsDTO {
	
	private Long id;
	private String name;
	private LocalDate year;
	private String model;
	private String imgUrl;
	
	
	
	public HotwheelsDTO() {
	}



	public HotwheelsDTO(Long id, String name, LocalDate year, String model, String imgUrl) {
		this.id = id;
		this.name = name;
		this.year = year;
		this.model = model;
		this.imgUrl = imgUrl;
	}
	
	public HotwheelsDTO(Hotwheels entity) {
		id = entity.getId();
		name = entity.getName();
		year = entity.getYear();
		model = entity.getModel();
		imgUrl = entity.getImgUrl();
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