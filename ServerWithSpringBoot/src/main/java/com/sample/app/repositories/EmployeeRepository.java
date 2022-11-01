package com.sample.app.repositories;

import com.sample.app.model.Article;
import com.sample.app.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    Employee findById(long id);

    Employee findByFirstName(String firstName);

    Employee findByLastName(String lastName);

    @Override
    Iterable<Employee> findAll();
}
