package br.com.desafio.service.impl;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import br.com.desafio.repository.CustomRepository;
import br.com.desafio.service.CrudService;

public class CrudServiceImpl <T, ID extends Serializable, R extends CustomRepository<T, ID>>  implements CrudService<T, ID> {

	@Autowired	
    protected R repository;
	
	@Override
	public Page<T> findAll(Pageable pageRequest) {
		return null;
	}

	@Override
	public Page<T> findBySpecification(Specification<T> specification, Pageable pageRequest) {
		return repository.findAll(specification, pageRequest);
	}

}
