package com.bugtracker.bugmanager.services.implementations;

import com.bugtracker.bugmanager.entities.Project_team;
import com.bugtracker.bugmanager.exceptions.ResourceNotFoundException;
import com.bugtracker.bugmanager.payloads.ProjectTeamDto;
import com.bugtracker.bugmanager.repositories.ProjectRepo;
import com.bugtracker.bugmanager.repositories.ProjectTeamRepo;
import com.bugtracker.bugmanager.repositories.UserRepo;
import com.bugtracker.bugmanager.services.ProjectTeamServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectTeamServiceImpl implements ProjectTeamServiceInterface {

    @Autowired
    ProjectTeamRepo projectTeamRepo;

    @Autowired
    ProjectRepo projectRepository;

    @Autowired
    UserRepo userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ProjectTeamDto createProjectTeam(ProjectTeamDto projectTeamDto) {
//        User user = userRepository.findById(projectTeamDto.getUser().getUserid())
//                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("The user form projecteam dto "+projectTeamDto.getUser());
        System.out.println("The project from projectteam dto "+projectTeamDto.getProject());
//        System.out.println("The User : "+ user.getUserid());
//
//        Project project = projectRepository.findById(projectTeamDto.getProject().getId())
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//        System.out.println("The Project : "+project.getId());


        Project_team projectTeam = this.dtoToProjectTeam(projectTeamDto);
        Project_team savedProjectTeam = this.projectTeamRepo.save(projectTeam);
        return this.projectTeamToDto(projectTeam);
    }

    @Override
    public ProjectTeamDto updateProjectTeam(ProjectTeamDto projectTeamDto, Integer projectTeamId) {

        Project_team projectTeam = this.projectTeamRepo.findById(projectTeamId).orElseThrow(()->new ResourceNotFoundException("ProjectTeam","ProjectId",projectTeamId));
        projectTeam.setUser(projectTeamDto.getUser());
        projectTeam.setProject(projectTeamDto.getProject());
        projectTeam.setRole(projectTeamDto.getRole());
        projectTeam.setAssigned_at(projectTeamDto.getAssigned_at());
        this.projectTeamRepo.save(projectTeam);

        return this.projectTeamToDto(projectTeam);
    }

    @Override
    public ProjectTeamDto getProjectTeamById(Integer projectTeamId) {
        Project_team projectTeam = this.projectTeamRepo.findById(projectTeamId).orElseThrow(() -> new ResourceNotFoundException("ProjectTeam","ProjectId",projectTeamId));
        return this.projectTeamToDto(projectTeam);
    }

    @Override
    public List<ProjectTeamDto> getAllProjectTeams() {
        List<Project_team> projectTeams = this.projectTeamRepo.findAll();
        List<ProjectTeamDto> projectTeamDtos = projectTeams.stream().map(projectTeam -> this.projectTeamToDto(projectTeam)).collect(Collectors.toList());
        return projectTeamDtos;
    }

    @Override
    public void deleteProjectTeam(Integer projectTeamId) {
        Project_team projectTeam = this.projectTeamRepo.findById(projectTeamId).orElseThrow(()->new ResourceNotFoundException("ProjectTeamMember","ProjectId",projectTeamId));
        this.projectTeamRepo.delete(projectTeam);
    }

    @Override
    public List<ProjectTeamDto> findByProjectId(Integer project_id) {
        List<Project_team> projectTeams = this.projectTeamRepo.findByProject_Id(project_id);
        List<ProjectTeamDto> projectTeamDtos = projectTeams.stream().map(projectTeam -> modelMapper.map(projectTeam,ProjectTeamDto.class)).collect(Collectors.toList());
        return projectTeamDtos;
    }

    @Override
    public int countByProjectId(Integer project_id) {
        Integer memberCount = this.projectTeamRepo.countByProject_Id(project_id);
        return memberCount;
    }

    @Override
    public List<ProjectTeamDto> findByUser_Id(Integer user_id) {
        List<Project_team> projectTeams = this.projectTeamRepo.findByUser_Id(user_id);
        List<ProjectTeamDto> projectTeamDtos = projectTeams.stream().map(projectTeam -> modelMapper.map(projectTeam,ProjectTeamDto.class)).collect(Collectors.toList());
        return  projectTeamDtos;
    }

    @Override
    public int countByUser_id(Integer userid) {
        int count = projectTeamRepo.countByUser_Id(userid);
        return count;
    }

    public Project_team dtoToProjectTeam(ProjectTeamDto projectTeamDto){
        Project_team projectTeam = new Project_team();
        projectTeam.setId(projectTeamDto.getId());
        projectTeam.setUser(projectTeamDto.getUser());
        projectTeam.setProject(projectTeamDto.getProject());
        projectTeam.setRole(projectTeamDto.getRole());
        projectTeam.setAssigned_at(projectTeamDto.getAssigned_at());
//        return null;
        return  projectTeam;
    }

    public ProjectTeamDto projectTeamToDto(Project_team projectTeam) {
        ProjectTeamDto projectTeamDto = new ProjectTeamDto();
        projectTeamDto.setId(projectTeam.getId());
        projectTeamDto.setUser(projectTeam.getUser());
        projectTeamDto.setProject(projectTeam.getProject());
        projectTeamDto.setRole(projectTeam.getRole());
        projectTeamDto.setAssigned_at(projectTeam.getAssigned_at());
        return projectTeamDto;
    }



}
