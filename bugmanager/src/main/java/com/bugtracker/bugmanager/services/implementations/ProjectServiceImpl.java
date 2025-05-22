package com.bugtracker.bugmanager.services.implementations;

import com.bugtracker.bugmanager.entities.Project;
import com.bugtracker.bugmanager.exceptions.ResourceNotFoundException;
import com.bugtracker.bugmanager.payloads.ProjectDto;
import com.bugtracker.bugmanager.payloads.UserDto;
import com.bugtracker.bugmanager.repositories.ProjectRepo;
import com.bugtracker.bugmanager.services.ProjectServiceInterface;
import com.bugtracker.bugmanager.services.UserSeriveInteface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
@Service
public class ProjectServiceImpl implements ProjectServiceInterface {

    @Autowired
    ProjectRepo projectRepo;

    @Autowired
    NotificationService notificationService;

    @Autowired
    UserSeriveInteface userSeriveInteface;

    @Autowired
    ModelMapper modelMapper;

//    @Transactional
//    public ProjectDto createProject(ProjectDto projectDto) {
//        Project project = this.modelMapper.map(projectDto,Project.class);
//        this.projectRepo.save(project);
//        UserDto user = this.userSeriveInteface.getUserById(projectDto.getUser().getUserid());
//        this.notificationService.sendProjectAssignmentEmail(user.getEmail(),projectDto.getProject_name());
//        return this.modelMapper.map(project,ProjectDto.class);
//    }
@Transactional
public ProjectDto createProject(ProjectDto projectDto) {
    Project project = this.modelMapper.map(projectDto, Project.class);
    this.projectRepo.save(project); // Save first

    // Fetch user (check if caching can be used)
    UserDto user = this.userSeriveInteface.getUserById(projectDto.getUser().getUserid());

    // Send email asynchronously
    CompletableFuture.runAsync(() -> {
        this.notificationService.sendProjectAssignmentEmail(user.getEmail(), projectDto.getProject_name());
    });

    return this.modelMapper.map(project, ProjectDto.class);
}


    @Override
    public ProjectDto updateProject(ProjectDto projectDto, Integer projectId) {
        Project project = this.projectRepo.findById(projectId).orElseThrow(()-> new ResourceNotFoundException("Project","Id",projectId));
        project.setProject_name(projectDto.getProject_name());
        project.setDescription(projectDto.getDescription());
        project.setStart_date(projectDto.getStart_date());
        project.setEnd_date(projectDto.getEnd_date());
        project.setStatus(projectDto.getStatus());
        project.setUpdated(projectDto.getUpdated());
        project.setUser(projectDto.getUser());

        Project savedProject = this.projectRepo.save(project);


        return this.projectToDto(savedProject);
    }

    @Override
    public ProjectDto getProjectById(Integer projectId) {
        Project project = this.projectRepo.findById(projectId).orElseThrow(()-> new ResourceNotFoundException("Project","Id",projectId));
        return this.projectToDto(project);
    }

    @Override
    public List<ProjectDto> getAllProjects() {
        List<Project> projects = this.projectRepo.findAll();
        List<ProjectDto> projectDtos = projects.stream().map(project -> this.projectToDto(project)).collect(Collectors.toList());
        return projectDtos;
    }

    @Override
    public void deleteProject(Integer projectId) {
        Project project = this.projectRepo.findById(projectId).orElseThrow(()-> new ResourceNotFoundException("Project","Id",projectId));
        this.projectRepo.delete(project);
    }

    @Override
    public List<ProjectDto> getProjectByUserId(Integer userid) {
        List<Project> projects = this.projectRepo.findByUser_Id(userid);
        List<ProjectDto> projectDtos = projects.stream().map(project -> this.projectToDto(project)).collect(Collectors.toList());
        return projectDtos;
    }

    @Override
    public Integer countProjectsByManagerId(Integer userid) {
        return this.projectRepo.countByUser_Id(userid);
    }

    @Override
    public long getProjectCount() {
        return this.projectRepo.count();
    }

    @Override
    public Integer countByStatusNotIn(List<String> statuses) {
        return projectRepo.countByStatusNotIn(Arrays.asList("Closed", "CLOSED"));
    }

    public ProjectDto projectToDto(Project project){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setProject_name(project.getProject_name());
        projectDto.setDescription(project.getDescription());
        projectDto.setStart_date(project.getStart_date());
        projectDto.setEnd_date(project.getEnd_date());
        projectDto.setStatus(project.getStatus());
        projectDto.setCreated(project.getCreated());
        projectDto.setUpdated(project.getUpdated());
        projectDto.setUser(project.getUser());

        return projectDto;
    }

    public Project dtoToProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setId(projectDto.getId());
        project.setProject_name(projectDto.getProject_name());
        project.setDescription(projectDto.getDescription());
        project.setStart_date(projectDto.getStart_date());
        project.setEnd_date(projectDto.getEnd_date());
        project.setStatus(projectDto.getStatus());
        project.setCreated(projectDto.getCreated());
        project.setUpdated(projectDto.getUpdated());
        project.setUser(projectDto.getUser());

        return project;
    }

}
