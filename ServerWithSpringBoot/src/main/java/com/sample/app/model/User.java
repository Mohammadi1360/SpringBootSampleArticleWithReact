package com.sample.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    private String lastName;

    @NotBlank(message = "Email Address is required")
    @Column(unique = true)
    private String emailAddress;

    @NotBlank(message = "UserName is required")
    @Column(unique = true)
    private String username;

    @Column
    @JsonIgnore
    private String password;

//    @OneToMany(mappedBy = "review")
//    private List<Review> reviewList;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public List<Review> getReviewList() {
//        return reviewList;
//    }
//
//    public void setReviewList(List<Review> reviewList) {
//        this.reviewList = reviewList;
//    }
}