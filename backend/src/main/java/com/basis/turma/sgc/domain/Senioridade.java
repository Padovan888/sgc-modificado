package com.basis.turma.sgc.domain;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "senioridade")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Senioridade implements Serializable {

    @Id
    @Column(name="id")
    private Long id;

    @Column(name="descricao")
    private String descricao;

}
