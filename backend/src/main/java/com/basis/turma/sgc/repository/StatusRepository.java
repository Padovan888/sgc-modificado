package com.basis.turma.sgc.repository;

import com.basis.turma.sgc.domain.Status;
import com.basis.turma.sgc.service.dto.DropDownDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    @Query("select new com.basis.turma.sgc.service.dto.DropDownDTO(s.id,s.descricao) from Status s")
    List<DropDownDTO> findAllByDropDown();

}
