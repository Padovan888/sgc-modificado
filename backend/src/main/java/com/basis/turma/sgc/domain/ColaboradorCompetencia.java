package com.basis.turma.sgc.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "colaborador_competencia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ColaboradorCompetencia implements Serializable {

    @EmbeddedId
    private IdColaboradorCompetencia id;

    @ManyToOne
    @MapsId("id_colaborador")
    @JoinColumn(name = "id_colaborador", referencedColumnName = "id")
    private Colaborador colaborador;

    @ManyToOne
    @MapsId("id_competencia")
    @JoinColumn(name = "id_competencia", referencedColumnName = "id")
    private Competencia competencia;

    @Column(name = "nivel")
    private Integer nivel;

}
