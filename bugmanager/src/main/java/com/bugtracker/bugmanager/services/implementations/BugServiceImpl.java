package com.bugtracker.bugmanager.services.implementations;

import com.bugtracker.bugmanager.entities.Bug;
import com.bugtracker.bugmanager.entities.Project;
import com.bugtracker.bugmanager.entities.User;
import com.bugtracker.bugmanager.exceptions.ResourceNotFoundException;
import com.bugtracker.bugmanager.payloads.BugDto;
import com.bugtracker.bugmanager.payloads.UserDto;
import com.bugtracker.bugmanager.repositories.BugRepo;
import com.bugtracker.bugmanager.repositories.ProjectRepo;
import com.bugtracker.bugmanager.services.BugServiceInterface;
import com.bugtracker.bugmanager.services.UserSeriveInteface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;


@Service
public class BugServiceImpl implements BugServiceInterface {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    BugRepo bugRepo;

    @Autowired
    UserSeriveInteface userSeriveInteface;

    @Autowired
    ProjectRepo projectRepo;

    @Autowired
    private NotificationService notificationService;

//    @Override
//    public BugDto createBug(BugDto bugDto) {
//        System.out.println("BugDto Data");
//        System.out.println(bugDto.getTitle());
//        System.out.println(bugDto.getDescription());
//        System.out.println(bugDto.getPriority());
//        System.out.println(bugDto.getStatus());
//        System.out.println(bugDto.getReported_by_user_id().getUserid());
//        System.out.println(bugDto.getUser().getUserid());
//        System.out.println(bugDto.getProject().getId());
//
//        Bug bug = this.modelMapper.map(bugDto,Bug.class);
//        System.out.println("Now the Bug Data");
//        System.out.println(bug.getTitle());
//        System.out.println(bug.getDescription());
//        System.out.println(bug.getPriority());
//        System.out.println(bug.getStatus());
//        System.out.println(bug.getReported_by_user_id().getUserid());
//        System.out.println(bug.getUser().getUserid());
//        System.out.println(bug.getProject().getId());
//        System.out.println("End..................");
//
//        this.bugRepo.save(bug);
//        return this.modelMapper.map(bug,BugDto.class);
//    }


    @Override
    public BugDto createBug(BugDto bugDto) {
        // Convert DTO to Entity
        Bug bug = this.modelMapper.map(bugDto, Bug.class);
        this.bugRepo.save(bug);
        if (bug.getUser() != null) { // Ensure a user is assigned
            int userid = bug.getUser().getUserid();
            System.out.println("The User id "+userid);
            UserDto user = this.userSeriveInteface.getUserById(userid);

            String userEmail = user.getEmail();
            String bugTitle = bug.getTitle();
            int bugId = bug.getId();
            String status = bug.getStatus();
            System.out.println("The email "+userEmail);
            System.out.println("The Title "+bugTitle);
            System.out.println("The BugId "+bugId);

            CompletableFuture.runAsync(()->{
                notificationService.sendBugAssignmentEmail(userEmail, bugTitle, bugId,status);
            });
        }

        // Send email notification


        return this.modelMapper.map(bug, BugDto.class);
    }

//    @Override
//    public BugDto updateBug(BugDto bugDto, Integer bugId) {
//        Bug bug = this.bugRepo.findById(bugId).orElseThrow(()->new ResourceNotFoundException("Bug","BugId",bugId));
//        bug.setTitle(bugDto.getTitle());
//        bug.setDescription(bugDto.getDescription());
//        bug.setPriority(bugDto.getPriority());
//        bug.setStatus(bugDto.getStatus());
//        bug.setUpdated(bugDto.getUpdated());
//        bug.setReported_by_user_id(bugDto.getReported_by_user_id());
//        bug.setUser(bugDto.getUser());
//        bug.setProject(bugDto.getProject());
//
//        this.bugRepo.save(bug);
//        return this.modelMapper.map(bug,BugDto.class);
//    }


//    @Override
//    public BugDto updateBug(BugDto bugDto, Integer bugId) {
//        Bug bug = this.bugRepo.findById(bugId)
//                .orElseThrow(() -> new ResourceNotFoundException("Bug", "BugId", bugId));
//
//        bug.setTitle(bugDto.getTitle());
//        bug.setDescription(bugDto.getDescription());
//        bug.setPriority(bugDto.getPriority());
//        bug.setStatus(bugDto.getStatus());
//        bug.setUpdated(bugDto.getUpdated());
//        bug.setReported_by_user_id(bugDto.getReported_by_user_id());
//
//        int userid = bugDto.getUser().getUserid();
//        UserDto user = this.userSeriveInteface.getUserById(userid);
//
//        // Check if a user (tester/developer) is assigned
//        if (bugDto.getUser() != null) {
//            bug.setUser(bugDto.getUser());
//            System.out.println("The user is of Updated"+bug.getUser().getUserid());
//
//            // Send email notification for bug assignment
//            notificationService.sendBugAssignmentEmail(
//                    user.getEmail(), // Fetch assigned user's email
//                    bug.getTitle(),
//                    bugId,
//                    bug.getStatus()
//
//
//            );
//            System.out.println("Mail Sent to  "+user.getEmail());
//            System.out.println("Mail sent to  "+user.getUsername());
//
//        } else {
//            // If bug is closed, remove the user assignment
//            bug.setUser(null);
//        }
//
//        bug.setProject(bugDto.getProject());
//
//        this.bugRepo.save(bug);
//        return this.modelMapper.map(bug, BugDto.class);
//    }




//    @Override
//    public BugDto updateBug(BugDto bugDto, Integer bugId) {
//        Bug bug = this.bugRepo.findById(bugId)
//                .orElseThrow(() -> new ResourceNotFoundException("Bug", "BugId", bugId));
//
//        bug.setTitle(bugDto.getTitle());
//        bug.setDescription(bugDto.getDescription());
//        bug.setPriority(bugDto.getPriority());
//        bug.setStatus(bugDto.getStatus());
//        bug.setUpdated(bugDto.getUpdated());
//        bug.setReported_by_user_id(bugDto.getReported_by_user_id());
//
//        int userid = bugDto.getUser().getUserid();
//        UserDto user = this.userSeriveInteface.getUserById(userid);
//
//        // Null check for bug.getUser() before accessing its properties
//        if (bug.getUser() != null && bug.getUser().getUsername().equals(user.getUsername()) &&
//                (user.getRole().equalsIgnoreCase("DEVELOPER") || user.getRole().equalsIgnoreCase("TESTER"))) {
//
//            this.projectRepo.findById(bug.getProject().getId()).ifPresent(project -> {
//                Integer managerId = project.getUser().getUserid();
//                UserDto manager = this.userSeriveInteface.getUserById(managerId);
//                String email = manager.getEmail();
//
//                this.notificationService.notifyManagerOnStatusChange(email, bug.getTitle(), bug.getId(), bugDto.getStatus(), bug.getUser().getUsername());
//            });
//        }
//
//        // Check if a user (tester/developer) is assigned
//        if (bugDto.getUser() != null) {
//            bug.setUser(bugDto.getUser());
//            System.out.println("The user is Updated: " + bug.getUser().getUserid());
//
//            // Send email notification for bug assignment
//            notificationService.sendBugAssignmentEmail(
//                    user.getEmail(), // Assigned user's email
//                    bug.getTitle(),
//                    bugId,
//                    bug.getStatus()
//            );
//
//            System.out.println("Mail Sent to " + user.getEmail());
//            System.out.println("Mail sent to " + user.getUsername());
//
//        } else {
//            // If bug is closed, remove the user assignment
//            bug.setUser(null);
//        }
//
//        bug.setProject(bugDto.getProject());
//
//        this.bugRepo.save(bug);
//        return this.modelMapper.map(bug, BugDto.class);
//    }




    @Override
    public BugDto updateBug(BugDto bugDto, Integer bugId) {
        Bug bug = this.bugRepo.findById(bugId)
                .orElseThrow(() -> new ResourceNotFoundException("Bug", "BugId", bugId));

        bug.setTitle(bugDto.getTitle());
        bug.setDescription(bugDto.getDescription());
        bug.setPriority(bugDto.getPriority());
        bug.setStatus(bugDto.getStatus());
        bug.setUpdated(bugDto.getUpdated());
        bug.setReported_by_user_id(bugDto.getReported_by_user_id());

        int userid = bugDto.getUser().getUserid();
        UserDto user = this.userSeriveInteface.getUserById(userid);

        // Notify Manager when Developer/Tester updates status (without assigning a new user)
        if (bug.getUser() != null && bug.getUser().getUsername().equals(user.getUsername()) &&
                (user.getRole().equalsIgnoreCase("DEVELOPER") || user.getRole().equalsIgnoreCase("TESTER"))) {

            this.projectRepo.findById(bug.getProject().getId()).ifPresent(project -> {
                Integer managerId = project.getUser().getUserid();
                UserDto manager = this.userSeriveInteface.getUserById(managerId);
                String email = manager.getEmail();

                this.notificationService.notifyManagerOnStatusChange(
                        email,
                        bug.getTitle(),
                        bug.getId(),
                        bugDto.getStatus(),
                        bug.getUser().getUsername()
                );
            });
        }

        // Notify Assigned User only if assignment has changed
        if (bugDto.getUser() != null && (bug.getUser() == null || !Objects.equals(bug.getUser().getUserid(), bugDto.getUser().getUserid()))) {
            bug.setUser(bugDto.getUser());

            notificationService.sendBugAssignmentEmail(
                    user.getEmail(), // Assigned user's email
                    bug.getTitle(),
                    bugId,
                    bug.getStatus()
            );

            System.out.println("Bug assigned to " + user.getUsername() + ", Email sent to: " + user.getEmail());
        } else if (bugDto.getUser() == null) {
            // If bug is closed, remove the user assignment
            bug.setUser(null);
        }

        bug.setProject(bugDto.getProject());

        this.bugRepo.save(bug);
        return this.modelMapper.map(bug, BugDto.class);
    }




    @Override
    public BugDto getBugById(Integer bugId) {
        Bug bug = this.bugRepo.findById(bugId).orElseThrow(()->new ResourceNotFoundException("Bug","BugId",bugId));
        return this.modelMapper.map(bug,BugDto.class);
    }

    @Override
    public List<BugDto> getAllBugs() {
        List<Bug> bugs = this.bugRepo.findAll();
        List<BugDto> bugDtos = bugs.stream().map(bug -> this.modelMapper.map(bug,BugDto.class)).collect(Collectors.toList());
        return bugDtos;
    }

    @Override
    public void deleteBug(Integer bugId) {
        Bug bug = this.bugRepo.findById(bugId).orElseThrow(()-> new ResourceNotFoundException("Bug","UserId",bugId));
        this.bugRepo.delete(bug);
    }

    @Override
    public int bugCount(int projecid) {
        int bugCount = this.bugRepo.countByProjectId(projecid);
        return bugCount;
    }

    @Override
    public List<BugDto> getBugByProject_Id(Integer projectid) {
        List<Bug> bugs = this.bugRepo.findByProject_Id(projectid);
        List<BugDto> bugDtos = bugs.stream().map(bug -> this.modelMapper.map(bug,BugDto.class)).collect(Collectors.toList());
        return bugDtos;
    }

    @Override
    public int countByUser_IdAndProject_Id(int userid, int projectid) {
        int bugCountByUseridAndProjectId = this.bugRepo.countByUser_IdAndProject_Id(userid, projectid);
        return bugCountByUseridAndProjectId;
    }

    @Override
    public int countActiveBugFromUserIdAndProjectId(int userid, int projectid) {
        int bugCountByUseridAndProjectId = this.bugRepo.countActiveBugsByUserIdAndProjectId(userid, projectid);
        return bugCountByUseridAndProjectId;
    }

//    @Override
//    public int countByUser_IdAndProject_Id(int userid, int projectid) {
//        int bugCountByUseridAndProjectId = this.bugRepo.countActiveBugsByUserIdAndProjectId(userid, projectid);
//        return bugCountByUseridAndProjectId;
//    }

    @Override
    public List<BugDto> findByUser_IdAndProject_Id(int userid, int projectid) {
        List<Bug> bugs = this.bugRepo.findByUser_IdAndProject_Id(userid,projectid);
        List<BugDto> bugDtos = bugs.stream().map(bug -> this.modelMapper.map(bug,BugDto.class)).collect(Collectors.toList());
        return bugDtos;
    }

    @Override
    public int countActiveBugsByProjectId(int projectid) {
        int count = this.bugRepo.countActiveBugsByProjectId(projectid);
        return count;
    }

    @Override
    public List<BugDto> findByUser_Id(int userid) {
        List<Bug> bugs = this.bugRepo.findByUser_Id(userid);
        List<BugDto> bugDtos = bugs.stream().map(bug -> this.modelMapper.map(bug,BugDto.class)).collect(Collectors.toList());
        return  bugDtos;
    }

    @Override
    public int countByUser_Id(int userid) {
        return this.bugRepo.countByUser_Id(userid);
    }

    @Override
    public int countActiveBugsByUserId(int userid) {
        int count = this.bugRepo.countActiveBugsByUserId(userid);
        return count;
    }
}