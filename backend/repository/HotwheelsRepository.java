package com.projeto.hotwheels.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.hotwheels.entity.Hotwheels;

@Repository
public interface HotwheelsRepository extends JpaRepository<Hotwheels, Long>{

}