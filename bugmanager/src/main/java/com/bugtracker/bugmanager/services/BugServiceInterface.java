package com.bugtracker.bugmanager.services;

import com.bugtracker.bugmanager.entities.Bug;
import com.bugtracker.bugmanager.payloads.BugDto;
import com.bugtracker.bugmanager.payloads.ProjectDto;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BugServiceInterface{
    BugDto createBug(BugDto bugDto);
    BugDto updateBug(BugDto bugDto,Integer bugId);
    BugDto getBugById(Integer bugId);
    List<BugDto> getAllBugs();
    void deleteBug(Integer bugId);
    int bugCount(int projecid);
    List<BugDto> getBugByProject_Id(Integer projectid);
//    int countByUserid(int userid);
    int countByUser_IdAndProject_Id(int userid,int projectid);

    int countActiveBugFromUserIdAndProjectId(int userid,int projectid);
    List<BugDto> findByUser_IdAndProject_Id(int userid,int projectid);

    int countActiveBugsByProjectId(int projectid);;

    List<BugDto> findByUser_Id(int userid);

    int countByUser_Id(int userid);

    int countActiveBugsByUserId(int userid);



}
