package com.sample.app.controller;

import com.sample.app.model.Employee;
import com.sample.app.services.EmployeeService;
import com.sample.app.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@RestController
@RequestMapping("/api/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewEmployee(@Valid @RequestBody Employee employee, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        employee = employeeService.saveOrUpdateEmployee(employee);
        return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editEmployee(@Valid @RequestBody Employee employee, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        employee = employeeService.saveOrUpdateEmployee(employee);
        return new ResponseEntity<Employee>(employee, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable long id) {
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<Employee>(employee, HttpStatus.OK);
    }

    @GetMapping("")
    public Iterable<Employee> getAllEmployees() {
        return employeeService.findAllEmployees();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable long id) {
        employeeService.deleteEmployeeById(id);
        return new ResponseEntity<String>("{}", HttpStatus.OK);
    }
}
