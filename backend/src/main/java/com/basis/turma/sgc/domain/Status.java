package com.basis.turma.sgc.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="status")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Status implements Serializable {

    @Id
    @Column(name="id")
    private Long id;

    @Column(name="descricao")
    private String descricao;

}
