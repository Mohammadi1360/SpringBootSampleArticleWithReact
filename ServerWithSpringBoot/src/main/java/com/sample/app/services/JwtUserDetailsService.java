package com.sample.app.services;

import com.sample.app.dto.UserDto;
import com.sample.app.exceptions.UserEmailAddressException;
import com.sample.app.exceptions.UserUserNameException;
import com.sample.app.model.User;
import com.sample.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public User save(UserDto user) {
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmailAddress(user.getEmailAddress());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        User existsUser = userRepository.findByUsername(newUser.getUsername());
        if (existsUser != null) {
            throw new UserUserNameException("User with UserName " + existsUser.getUsername() + " is already exists.");
        }

        existsUser = userRepository.findByEmailAddress(newUser.getEmailAddress());
        if (existsUser != null) {
            throw new UserEmailAddressException("User with Email Address  " + existsUser.getEmailAddress() + " is already exists.");
        }

        try {
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UserUserNameException("Unknown Error.");
        }

    }
}