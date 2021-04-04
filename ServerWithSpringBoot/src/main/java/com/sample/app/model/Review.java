package com.sample.app.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Review Text is required")
    private String reviewText;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name="user_id")
//    private User user;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name="article_id")
//    private Article article;

    @JsonFormat(pattern = "yyyy-mm-dd")
    @Column(updatable = false)
    private Date reviewDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

//    public Article getArticle() {
//        return article;
//    }
//
//    public void setArticle(Article article) {
//        this.article = article;
//    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
}
