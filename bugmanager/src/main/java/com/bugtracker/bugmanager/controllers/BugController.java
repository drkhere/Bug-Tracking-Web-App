package com.bugtracker.bugmanager.controllers;
import com.bugtracker.bugmanager.payloads.ApiResponse;
import com.bugtracker.bugmanager.payloads.BugDto;
import com.bugtracker.bugmanager.services.BugServiceInterface;
import jakarta.persistence.criteria.CriteriaBuilder;
import jdk.jshell.Snippet;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/bugs")
public class BugController {

    @Autowired
    BugServiceInterface bugServiceInterface;

    @Autowired
    ModelMapper modelMapper;


    //Post -create bug
    @PostMapping("/")
    public ResponseEntity<BugDto> createBug(@RequestBody BugDto bugDto){
        BugDto bugDto1 = this.bugServiceInterface.createBug(bugDto);
        return ResponseEntity.ok(bugDto1);
    }

    //Put -update Bug
    @PutMapping("/{id}")
    public ResponseEntity<BugDto> updateTeamMember(@RequestBody BugDto bugDto, @PathVariable("id") Integer id){
        BugDto updatedBugDto = bugServiceInterface.updateBug(bugDto,id);
        return ResponseEntity.ok(updatedBugDto);
    }

    //Get -all bug
    @GetMapping("/")
    public ResponseEntity<List<BugDto>> getAllBugs(){
        return ResponseEntity.ok(this.bugServiceInterface.getAllBugs());
    }

    //Get -single bug
    @GetMapping("/{id}")
    public ResponseEntity<BugDto> getBugById(@PathVariable("id") Integer id){
        return ResponseEntity.ok(this.bugServiceInterface.getBugById(id));

    }

    //Delete -delete bug by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBug(@PathVariable("id") Integer id){
        this.bugServiceInterface.deleteBug(id);
        return new ResponseEntity<>(new ApiResponse("Bug Deleted Successfully",true), HttpStatus.OK);
    }

    @GetMapping("/{projectId}/bugcount/")
    public ResponseEntity<Integer> bugCount(@PathVariable("projectId") Integer projectId){
       Integer bugcount = this.bugServiceInterface.bugCount(projectId);
       return new ResponseEntity<>(bugcount,HttpStatus.OK);
    }

    @GetMapping("project/{projectId}/bugs/")
    public ResponseEntity<List<BugDto>> getBugByProjectId(@PathVariable("projectId") Integer projectId){
        return ResponseEntity.ok(this.bugServiceInterface.getBugByProject_Id(projectId));
    }

    @GetMapping("/user/{userid}/project/{projectid}/bugcount/")
    public ResponseEntity<Integer> getBugCountForUserid(@PathVariable("userid") Integer userid,@PathVariable("projectid") Integer projectid){
        return ResponseEntity.ok(this.bugServiceInterface.countByUser_IdAndProject_Id(userid,projectid));
    }

    @GetMapping("/user/{userid}/project/{projectid}/activebugcount/")
    public ResponseEntity<Integer> getActiveBugCountForUseridAndProjectid(@PathVariable("userid") Integer userid,@PathVariable("projectid") Integer projectid){
        return ResponseEntity.ok(this.bugServiceInterface.countActiveBugFromUserIdAndProjectId(userid,projectid));
    }



    @GetMapping("/user/{userid}/project/{projectid}/bugs/")
    public ResponseEntity<List<BugDto>> getBugForUserId(@PathVariable("userid") Integer userid,@PathVariable("projectid") Integer projectid){
        return ResponseEntity.ok(this.bugServiceInterface.findByUser_IdAndProject_Id(userid,projectid));
    }

    @GetMapping("/project/{projectid}/activebugcount")
    public ResponseEntity<Integer> countActiveBugsByProjectId(@PathVariable("projectid") Integer projectid){
        int count = this.bugServiceInterface.countActiveBugsByProjectId(projectid);
        return  new ResponseEntity<>(count,HttpStatus.OK);
    }

    @GetMapping("/user/{userid}/bugs")
    public ResponseEntity<List<BugDto>> findBugsByUserid(@PathVariable("userid") Integer userid){
        return ResponseEntity.ok(this.bugServiceInterface.findByUser_Id(userid));
    }

    @GetMapping("/user/{userid}/bug/bugcount")
    public ResponseEntity<Integer> countBugsAssignedToUser(@PathVariable("userid") Integer userid){
        return ResponseEntity.ok(this.bugServiceInterface.countByUser_Id(userid));
    }

    @GetMapping("/user/{userid}/activebugcount")
    public ResponseEntity<Integer> countActiveBugsByUserId(@PathVariable("userid") Integer userid){
        int count = this.bugServiceInterface.countActiveBugsByUserId(userid);
        System.out.println("The bug count"+count);
        return  new ResponseEntity<>(count,HttpStatus.OK);
    }

}
