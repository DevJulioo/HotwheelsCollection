package com.projeto.hotwheels.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.hotwheels.dto.HotwheelsDTO;
import com.projeto.hotwheels.entity.Hotwheels;
import com.projeto.hotwheels.repository.HotwheelsRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class HotwheelsService {

    @Autowired
    private HotwheelsRepository repository;

    public List<HotwheelsDTO> findAll() {
        List<Hotwheels> list = repository.findAll();
        return list.stream().map(HotwheelsDTO::new).collect(Collectors.toList());
    }

    public HotwheelsDTO findById(Long id) {
        Hotwheels entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hotwheels not found with id " + id));
        return new HotwheelsDTO(entity);
    }

    public HotwheelsDTO insert(HotwheelsDTO dto) {
        Hotwheels entity = new Hotwheels();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new HotwheelsDTO(entity);
    }

    public HotwheelsDTO update(Long id, HotwheelsDTO dto) {
        Hotwheels entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Hotwheels not found with id " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new HotwheelsDTO(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private void copyDtoToEntity(HotwheelsDTO dto, Hotwheels entity) {
        entity.setName(dto.getName());
        entity.setYear(dto.getYear());
        entity.setModel(dto.getModel());
        entity.setImgUrl(dto.getImgUrl());
    }
}