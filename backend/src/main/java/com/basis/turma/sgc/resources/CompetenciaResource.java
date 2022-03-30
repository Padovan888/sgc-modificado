package com.basis.turma.sgc.resources;

import com.basis.turma.sgc.domain.Competencia;
import com.basis.turma.sgc.service.dto.CompetenciaDTO;
import com.basis.turma.sgc.service.CompetenciaService;
import com.basis.turma.sgc.service.dto.CompetenciaListaDTO;
import com.basis.turma.sgc.service.dto.DropDownDTO;
import com.basis.turma.sgc.service.dto.TurmaFormacaoDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/competencia")
@AllArgsConstructor
public class CompetenciaResource {

    @Autowired
    private final CompetenciaService service;

    @GetMapping
    public ResponseEntity<List<CompetenciaListaDTO>> listar(){
        List<CompetenciaListaDTO> competenciaListaDTO = service.listar();
        return ResponseEntity.ok(competenciaListaDTO);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CompetenciaListaDTO> buscarId(@PathVariable Long id){
        CompetenciaListaDTO competenciaListaDTO = service.buscarPorId(id);
        return ResponseEntity.ok().body(competenciaListaDTO);
    }

    @PostMapping
    public ResponseEntity<CompetenciaDTO> criar(@Valid @RequestBody CompetenciaDTO competenciaDTO){
        CompetenciaDTO competenciaCriar = service.criar(competenciaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(competenciaCriar);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CompetenciaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody CompetenciaDTO competenciaDTO){
        CompetenciaDTO competenciaAtualizar = service.atualizar(id,competenciaDTO);
        return ResponseEntity.ok().body(competenciaAtualizar);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Turma de formação deletada!");
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<DropDownDTO>> listarCompetenciaComoDropDown(){
        List<DropDownDTO> dropDownCompetencia = service.listarCompetenciaComoDropDown();
        return ResponseEntity.ok().body(dropDownCompetencia);
    }

}