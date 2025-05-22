package com.bugtracker.bugmanager.services;

import com.bugtracker.bugmanager.payloads.ProjectDto;
import com.bugtracker.bugmanager.payloads.ProjectTeamDto;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;

public interface ProjectTeamServiceInterface {
    ProjectTeamDto createProjectTeam(ProjectTeamDto projectTeamDto);
    ProjectTeamDto updateProjectTeam(ProjectTeamDto projectTeamDto,Integer projectTeamId);
    ProjectTeamDto getProjectTeamById(Integer projectTeamId);
    List<ProjectTeamDto> getAllProjectTeams();
    void deleteProjectTeam(Integer projectTeamId);
    List<ProjectTeamDto> findByProjectId(Integer project_id);
    int countByProjectId(Integer project_id);
    List<ProjectTeamDto> findByUser_Id(Integer user_id);

    //Counts Projects Associated With A User By Its Id
    int countByUser_id(Integer userid);
}
