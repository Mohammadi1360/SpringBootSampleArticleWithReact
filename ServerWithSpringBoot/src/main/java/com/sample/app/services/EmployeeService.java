package com.sample.app.services;

import com.sample.app.exceptions.ArticleRfIdException;
import com.sample.app.exceptions.EmployeeIdException;
import com.sample.app.model.Article;
import com.sample.app.model.Employee;
import com.sample.app.repositories.ArticleRepository;
import com.sample.app.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    public Employee saveOrUpdateEmployee(Employee employee) {

        try {
            return employeeRepository.save(employee);

        } catch (Exception e) {
            throw new EmployeeIdException("Employee ID '" + employee.getId() + " 'already exists");
        }
    }

    public Employee findEmployeeById(long id) {
        Employee employee = employeeRepository.findById(id);

        if (employee == null) {
            throw new EmployeeIdException("Employee ID does not exist");
        }

        return employee;
    }

    public Iterable<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    public void deleteEmployeeById(long id) {
        Employee employee = employeeRepository.findById(id);

        if (employee == null) {
            throw new EmployeeIdException("Cannot delete employee with ID " + id + ". This employee does not exist.");
        }
        employeeRepository.delete(employee);
    }
}

