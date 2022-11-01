package com.sample.app.exceptions;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

public class EmployeeIdExceptionResponse {

    private long id;

    public EmployeeIdExceptionResponse(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
