package br.com.desafio.service;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface CrudService <T, ID extends Serializable>{
	Page<T> findAll(Pageable pageRequest);
	Page<T> findBySpecification(Specification<T> specification, Pageable pageRequest);

}
