package com.sample.app.repositories;

import com.sample.app.model.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Repository
public interface ArticleRepository extends CrudRepository<Article, Long> {

    Article findById(long id);

    Article findByRfid(String rfid);

    @Override
    Iterable<Article> findAll();
}
