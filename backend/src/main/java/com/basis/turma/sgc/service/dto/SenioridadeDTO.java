package com.basis.turma.sgc.service.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class SenioridadeDTO implements Serializable {
    private Long id;
    private String descricao;
}
