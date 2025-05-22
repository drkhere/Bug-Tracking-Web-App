package com.bugtracker.bugmanager.repositories;

import com.bugtracker.bugmanager.entities.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuggestionRepo extends JpaRepository<Suggestion,Integer> {

    Suggestion findByBug_Id(Integer bugid);
}
