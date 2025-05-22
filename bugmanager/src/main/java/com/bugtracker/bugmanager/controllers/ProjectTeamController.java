package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.payloads.ApiResponse;
import com.bugtracker.bugmanager.payloads.ProjectDto;
import com.bugtracker.bugmanager.payloads.ProjectTeamDto;
import com.bugtracker.bugmanager.services.ProjectServiceInterface;
import com.bugtracker.bugmanager.services.ProjectTeamServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/teams")
public class ProjectTeamController {

    @Autowired
    private ProjectTeamServiceInterface projectTeamServiceInterface;

    //Post-Create project team member
    @PostMapping("/")
    public ResponseEntity<ProjectTeamDto> createTeamMember(@RequestBody ProjectTeamDto projectTeamDto){
        System.out.println("Received Data: " + projectTeamDto);
        ProjectTeamDto createProjectTeamDto = this.projectTeamServiceInterface.createProjectTeam(projectTeamDto);
        return new ResponseEntity<>(createProjectTeamDto, HttpStatus.CREATED);
    }

    //Put - Update
    @PutMapping("/{id}")
    public ResponseEntity<ProjectTeamDto> updateTeamMember(@RequestBody ProjectTeamDto projectTeamDto,@PathVariable("id") Integer id){
        ProjectTeamDto createdProjectTeamDto = projectTeamServiceInterface.updateProjectTeam(projectTeamDto,id);
        return ResponseEntity.ok(createdProjectTeamDto);
    }

    //Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id){
        this.projectTeamServiceInterface.deleteProjectTeam(id);
        return new ResponseEntity<>(new ApiResponse("Team Member Deleted Successfully",true),HttpStatus.OK);
    }

    //Get by id
    @GetMapping("/{id}")
    public ResponseEntity<ProjectTeamDto> getSingleUser(@PathVariable("id") Integer id){
        return ResponseEntity.ok(this.projectTeamServiceInterface.getProjectTeamById(id));

    }

    //Get by projectId
    @GetMapping("/members/project/{projectid}")
    public ResponseEntity<List<ProjectTeamDto>> getTeamByProject(@PathVariable("projectid") Integer projectid){
        return ResponseEntity.ok(this.projectTeamServiceInterface.findByProjectId(projectid));
    }

    //Get all
    @GetMapping("/")
    public ResponseEntity<List<ProjectTeamDto>> getAllProject(){
        return ResponseEntity.ok(this.projectTeamServiceInterface.getAllProjectTeams());
    }

    @GetMapping("/project/{projectid}/membercount/")
    public  ResponseEntity<Integer> getMemberCount(@PathVariable("projectid") Integer projectid){
        return ResponseEntity.ok(this.projectTeamServiceInterface.countByProjectId(projectid));
    }

    @GetMapping("/user/{userid}/projects")
    public ResponseEntity<List<ProjectTeamDto>> getProjectsAssignedToUserByUserId(@PathVariable("userid") Integer userid){
        return  ResponseEntity.ok(this.projectTeamServiceInterface.findByUser_Id(userid));
    }

    @GetMapping("/user/{userid}/project/projectcount")
    public ResponseEntity<Integer> getProjectAssignedToUser(@PathVariable("userid") Integer userid){
        return  ResponseEntity.ok(this.projectTeamServiceInterface.countByUser_id(userid));
    }

}
