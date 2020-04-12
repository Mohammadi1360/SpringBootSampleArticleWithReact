package com.sample.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleArticleIfException(ArticleRfIdException ex, WebRequest request){
        ArticleRfIdExceptionResponse exceptionResponse = new ArticleRfIdExceptionResponse((ex.getMessage()));
        return  new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
