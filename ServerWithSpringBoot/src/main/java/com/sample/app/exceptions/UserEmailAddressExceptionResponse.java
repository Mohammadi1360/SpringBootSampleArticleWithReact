package com.sample.app.exceptions;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

public class UserEmailAddressExceptionResponse {

    private String emailAddress;

    public UserEmailAddressExceptionResponse(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
