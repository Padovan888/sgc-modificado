package com.basis.turma.sgc.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CompetenciaListaDTO implements Serializable {

    private Long id;
    private String nome;
    private String descricao;
    private Long idCategoria;
    private String descricaoCategoria;

}
