package com.bugtracker.bugmanager.services.implementations;

import com.bugtracker.bugmanager.entities.Suggestion;
import com.bugtracker.bugmanager.exceptions.ResourceNotFoundException;
import com.bugtracker.bugmanager.payloads.SuggestionDto;
import com.bugtracker.bugmanager.repositories.SuggestionRepo;
import com.bugtracker.bugmanager.services.SuggestionSeriveInterface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuggestionServiceImpl implements SuggestionSeriveInterface {

    @Autowired
    SuggestionRepo suggestionRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public SuggestionDto createSuggestion(SuggestionDto suggestionDto) {

        Suggestion suggestion = this.modelMapper.map(suggestionDto,Suggestion.class);
        this.suggestionRepo.save(suggestion);
        return suggestionDto;
    }

    @Override
    public SuggestionDto findSuggestionByBug_Id(Integer bugid) {
        Suggestion suggestion = this.suggestionRepo.findByBug_Id(bugid);
        if (suggestion == null) {
            throw new ResourceNotFoundException("Suggestion ","BugId" , bugid);
        }
        return this.modelMapper.map(suggestion,SuggestionDto.class);
    }
}
