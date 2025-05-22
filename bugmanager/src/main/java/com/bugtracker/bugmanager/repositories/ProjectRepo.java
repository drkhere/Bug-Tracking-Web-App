package com.bugtracker.bugmanager.repositories;

import com.bugtracker.bugmanager.entities.Project;
import com.bugtracker.bugmanager.entities.Project_team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepo extends JpaRepository<Project,Integer> {
    List<Project> findByUser_Id(Integer userid);
    Integer countByUser_Id(Integer userid);
    long count();

    Integer countByStatusNotIn(List<String> statuses);

}
