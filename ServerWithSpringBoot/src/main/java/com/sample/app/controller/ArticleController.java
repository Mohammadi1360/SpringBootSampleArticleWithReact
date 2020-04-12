package com.sample.app.controller;

import com.sample.app.model.Article;
import com.sample.app.services.ArticleService;
import com.sample.app.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@RestController
@RequestMapping("/api/article")
@CrossOrigin
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewArticle(@Valid @RequestBody Article article, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        articleService.saveOrUpdateArticle(article);

        return new ResponseEntity<Article>(article, HttpStatus.CREATED);
    }

    @GetMapping("/{rfid}")
    public ResponseEntity<?> getArticleByRfId(@PathVariable String rfid) {
        Article article = articleService.findArticleByRfId(rfid);

        return new ResponseEntity<Article>(article, HttpStatus.OK);
    }

    @GetMapping("")
    public Iterable<Article> getAllArticles() {
        return articleService.findAllArticles();
    }

    @DeleteMapping("/{rfid}")
    public ResponseEntity<?> deleteArticle(@PathVariable String rfid) {
        articleService.deleteArticleByRfid(rfid);

        return new ResponseEntity<String>("Article with RFID: " + rfid + " was deleted", HttpStatus.OK);
    }
}
