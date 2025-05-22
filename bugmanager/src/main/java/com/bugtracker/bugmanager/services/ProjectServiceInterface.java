package com.bugtracker.bugmanager.services;

import com.bugtracker.bugmanager.payloads.ProjectDto;
import com.bugtracker.bugmanager.payloads.UserDto;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.util.List;
public interface ProjectServiceInterface {
    ProjectDto createProject(ProjectDto projectDto);
    ProjectDto updateProject(ProjectDto projectDto,Integer projectId);
    ProjectDto getProjectById(Integer projectId);
    List<ProjectDto> getAllProjects();
    void deleteProject(Integer projectId);
    List<ProjectDto> getProjectByUserId(Integer userid);
    Integer countProjectsByManagerId(Integer userid);
    long getProjectCount();
    Integer countByStatusNotIn(List<String> statuses);

}
