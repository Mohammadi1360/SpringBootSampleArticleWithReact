package com.sample.app.repositories;

import com.sample.app.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}