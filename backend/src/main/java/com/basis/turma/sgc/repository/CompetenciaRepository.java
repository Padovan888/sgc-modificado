package com.basis.turma.sgc.repository;

import com.basis.turma.sgc.domain.Competencia;
import com.basis.turma.sgc.service.dto.DropDownDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetenciaRepository extends JpaRepository<Competencia,Long> {

    List<Competencia> findAllByNome(String nome);

    @Query("select new com.basis.turma.sgc.service.dto.DropDownDTO(c.id, c.nome) from Competencia c")
    List<DropDownDTO> findAllByDropDown();

}
