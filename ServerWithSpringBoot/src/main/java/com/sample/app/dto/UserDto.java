package com.sample.app.dto;

import com.sample.app.model.User;

import javax.validation.constraints.NotBlank;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

public class UserDto extends User {
    @NotBlank(message = "Password is required")
    private String password;

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }
}