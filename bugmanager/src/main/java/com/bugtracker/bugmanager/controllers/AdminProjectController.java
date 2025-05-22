package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.payloads.ApiResponse;
import com.bugtracker.bugmanager.payloads.ProjectDto;
import com.bugtracker.bugmanager.payloads.UserDto;
import com.bugtracker.bugmanager.services.ProjectServiceInterface;
import com.bugtracker.bugmanager.services.UserSeriveInteface;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/projects")
public class AdminProjectController {

    @Autowired
    private ProjectServiceInterface projectServiceInterface;

    //Post-Create user
    @PostMapping("/")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto){
        ProjectDto createProjectDto = this.projectServiceInterface.createProject(projectDto);
        return new ResponseEntity<>(createProjectDto, HttpStatus.CREATED);
    }

    //Put-Update User
    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectDto projectDto,@PathVariable("projectId") Integer projectId){
        ProjectDto updatedProjectDto = this.projectServiceInterface.updateProject(projectDto,projectId);
        return  ResponseEntity.ok(updatedProjectDto);
    }

    //Delete-Delete User

    @DeleteMapping("/{projectId}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable("projectId") Integer projectId){
        this.projectServiceInterface.deleteProject(projectId);
        return new ResponseEntity<>(new ApiResponse("Project Deleted Successfully",true),HttpStatus.OK);
    }


    //Get -user get
    @GetMapping("/")
    public ResponseEntity<List<ProjectDto>> getAllProject(){
        return ResponseEntity.ok(this.projectServiceInterface.getAllProjects());
    }

    //Get -singleUser
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDto> getSingleUser(@PathVariable("projectId") Integer projectId){
        return ResponseEntity.ok(this.projectServiceInterface.getProjectById(projectId));

    }

    @GetMapping("/{userid}/project/")
    public ResponseEntity<List<ProjectDto>> getProjectByUserId(@PathVariable("userid") Integer userid){
        return ResponseEntity.ok(this.projectServiceInterface.getProjectByUserId(userid));
    }

    @GetMapping("/manager/{managerid}/projectcount")
    public ResponseEntity<Integer> getProjectsByManagerId(@PathVariable("managerid") Integer managerid){
        Integer projectcount = this.projectServiceInterface.countProjectsByManagerId(managerid);
        return new ResponseEntity<>(projectcount,HttpStatus.OK);
    }

    @GetMapping("/count/allproject")
    public ResponseEntity<Long> getProjectCount(){
        return ResponseEntity.ok(this.projectServiceInterface.getProjectCount());
    }

    @GetMapping("/count/active/allproject")
    public ResponseEntity<Long> getActiveProjectsCount(){
        return ResponseEntity.ok(this.projectServiceInterface.getProjectCount());
    }

}
