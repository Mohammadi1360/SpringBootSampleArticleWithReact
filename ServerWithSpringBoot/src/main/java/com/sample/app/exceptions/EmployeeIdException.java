package com.sample.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmployeeIdException extends RuntimeException {
    public EmployeeIdException(String message) {
        super(message);
    }
}
