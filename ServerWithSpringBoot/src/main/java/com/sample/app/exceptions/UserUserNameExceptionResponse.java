package com.sample.app.exceptions;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

public class UserUserNameExceptionResponse {

    private String username;

    public UserUserNameExceptionResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
