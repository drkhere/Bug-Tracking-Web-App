package com.bugtracker.bugmanager.services;

import com.bugtracker.bugmanager.payloads.SuggestionDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuggestionSeriveInterface{

    SuggestionDto createSuggestion(SuggestionDto suggestionDto);
    SuggestionDto findSuggestionByBug_Id(Integer bugid);

}
