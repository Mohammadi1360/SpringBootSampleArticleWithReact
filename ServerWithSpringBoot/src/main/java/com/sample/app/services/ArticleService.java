package com.sample.app.services;

import com.sample.app.exceptions.ArticleRfIdException;
import com.sample.app.model.Article;
import com.sample.app.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;


    public Article saveOrUpdateArticle(Article article) {

        try {
            return articleRepository.save(article);

        } catch (Exception e) {
            throw new ArticleRfIdException("RFID ID '" + article.getRfid() + " 'already exists");
        }
    }

    public Article findArticleById(long id) {
        Article article = articleRepository.findById(id);

        if (article == null) {
            throw new ArticleRfIdException("Article ID does not exist");
        }

        return article;
    }

    public Iterable<Article> findAllArticles() {
        return articleRepository.findAll();
    }

    public void deleteArticleById(long id) {
        Article article = articleRepository.findById(id);

        if (article == null) {
            throw new ArticleRfIdException("Cannot delete article with ID " + id + ". This article does not exist.");
        }
        articleRepository.delete(article);
    }
}

