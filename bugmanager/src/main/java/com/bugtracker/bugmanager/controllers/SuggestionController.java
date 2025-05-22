package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.payloads.SuggestionDto;
import com.bugtracker.bugmanager.services.SuggestionSeriveInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Text;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/suggestion")
public class SuggestionController {

    @Autowired
    SuggestionSeriveInterface suggestionSeriveInterface;

    @PostMapping("/")
    public ResponseEntity<SuggestionDto> createSuggestion(@RequestBody SuggestionDto suggestionDto){
        SuggestionDto suggestionDto1 = this.suggestionSeriveInterface.createSuggestion(suggestionDto);
        return new ResponseEntity<>(suggestionDto,HttpStatus.CREATED);
    }

    @GetMapping("/bug/{bugid}")
    public ResponseEntity<?> getSuggestionByBugId(@PathVariable("bugid") Integer bugid){
        System.out.println("The bugid is "+bugid);
        SuggestionDto suggestionDto = this.suggestionSeriveInterface.findSuggestionByBug_Id(bugid);
        if (suggestionDto == null) {
            // Return 404 Not Found if no suggestion exists for the given bug ID
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "No suggestion found for bug ID: " + bugid);
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(suggestionDto, HttpStatus.OK);
//        return new ResponseEntity<>(suggestionDto,HttpStatus.OK);
    }
}
