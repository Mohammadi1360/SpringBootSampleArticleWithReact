package com.sample.app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by M.Mohammadi
 * on 10/04/2020.
 */

@RestController
@RequestMapping("/api/world")
public class HelloWorldController {

	@RequestMapping({ "/hello" })
	public String firstPage() {
		return "Hello World";
	}

}