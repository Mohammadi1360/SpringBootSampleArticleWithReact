package com.sample.app.exceptions;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

public class ArticleRfIdExceptionResponse {

    private String rfid;

    public ArticleRfIdExceptionResponse(String rfid) {
        this.rfid = rfid;
    }


    public String getRfid() {
        return rfid;
    }

    public void setRfid(String rfid) {
        this.rfid = rfid;
    }
}
