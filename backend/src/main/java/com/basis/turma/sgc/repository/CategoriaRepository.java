package com.basis.turma.sgc.repository;

import com.basis.turma.sgc.domain.Categoria;
import com.basis.turma.sgc.service.dto.DropDownDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Long> {

    @Query("select new com.basis.turma.sgc.service.dto.DropDownDTO(c.id, c.descricao) from Categoria c")
    List<DropDownDTO> findAllByDropDown();

}