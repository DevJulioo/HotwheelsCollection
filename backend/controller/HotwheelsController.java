package com.projeto.hotwheels.controller;

import com.projeto.hotwheels.dto.HotwheelsDTO;
import com.projeto.hotwheels.service.HotwheelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/hotwheels")
public class HotwheelsController {

    @Autowired
    private HotwheelsService service;

    @GetMapping
    public ResponseEntity<List<HotwheelsDTO>> findAll() {
        List<HotwheelsDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotwheelsDTO> findById(@PathVariable Long id) {
        HotwheelsDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<HotwheelsDTO> insert(@RequestBody HotwheelsDTO dto) {
        HotwheelsDTO newDto = service.insert(dto);
        URI uri = URI.create("/hotwheels/" + newDto.getId());
        return ResponseEntity.created(uri).body(newDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotwheelsDTO> update(@PathVariable Long id, @RequestBody HotwheelsDTO dto) {
        HotwheelsDTO updatedDto = service.update(id, dto);
        return ResponseEntity.ok().body(updatedDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}