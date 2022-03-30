package com.basis.turma.sgc.resources;

import com.basis.turma.sgc.service.dto.DropDownDTO;
import com.basis.turma.sgc.service.dto.StatusDTO;
import com.basis.turma.sgc.service.StatusService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/status")
@AllArgsConstructor
public class StatusResources {

    private final StatusService service;

    @GetMapping
    public ResponseEntity<List<StatusDTO>> listar() {
        List<StatusDTO> statusDTO = service.listar();
        return ResponseEntity.ok(statusDTO);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<DropDownDTO>> listarStatusDropDown() {
        return new ResponseEntity<>(service.listarStatusComoDropDown(), HttpStatus.OK);
    }

}
