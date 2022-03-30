package com.basis.turma.sgc.service.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CompetenciaColaboradorDTO implements Serializable {

    private Long idCompetencia;
    private String nomeCompetencia;
    private Long idColaborador;
    private String nomeColaborador;
    private String sobrenomeColaborador;

}
