package com.bugtracker.bugmanager.repositories;

import com.bugtracker.bugmanager.entities.Project_team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectTeamRepo extends JpaRepository<Project_team,Integer> {
    List<Project_team> findByProject_Id(Integer project_id);
    int countByProject_Id(Integer project_id);

    List<Project_team> findByUser_Id(Integer user_id);

    //Counts Projects Associated With A User By Its Id
    int countByUser_Id(Integer userid);
}
