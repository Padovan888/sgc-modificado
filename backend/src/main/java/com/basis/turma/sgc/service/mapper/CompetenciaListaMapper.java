package com.basis.turma.sgc.service.mapper;

import com.basis.turma.sgc.domain.Competencia;
import com.basis.turma.sgc.service.dto.CompetenciaListaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CompetenciaListaMapper extends EntityMapper<CompetenciaListaDTO, Competencia>{

    @Override
    @Mapping(source = "categoria.id", target = "idCategoria")
    @Mapping(source = "categoria.descricao", target = "descricaoCategoria")
    CompetenciaListaDTO toDTO(Competencia entity);

    @Override
    @Mapping(source = "idCategoria", target = "categoria.id")
    @Mapping(source = "descricaoCategoria", target = "categoria.descricao")
    Competencia toEntity(CompetenciaListaDTO dto);

}
