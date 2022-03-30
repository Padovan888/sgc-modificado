package com.basis.turma.sgc.service.dto;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.io.Serializable;

@Getter
@Setter
public class StatusDTO implements Serializable {

    private Long id;

    private String descricao;

}
