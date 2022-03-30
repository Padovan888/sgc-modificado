package com.basis.turma.sgc.repository;

import com.basis.turma.sgc.domain.Senioridade;
import com.basis.turma.sgc.service.dto.DropDownDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SenioridadeRepository extends JpaRepository<Senioridade,Long> {

    @Query("select new com.basis.turma.sgc.service.dto.DropDownDTO(s.id, s.descricao) from Senioridade s")
    List<DropDownDTO> findAllByDropDown();

}
