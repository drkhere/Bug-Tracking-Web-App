package com.bugtracker.bugmanager.repositories;

import com.bugtracker.bugmanager.entities.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BugRepo extends JpaRepository<Bug,Integer> {
    int countByProjectId(int project_id);
    List<Bug> findByProject_Id(int project_id);
//    int countByUser_Id(int userid);
    int countByUser_IdAndProject_Id(int userid,int projectid);

    @Query("SELECT COUNT(b) FROM Bug b WHERE b.user.id = :userId AND b.project.id = :projectId AND LOWER(b.status) <> 'closed'")
    int countActiveBugsByUserIdAndProjectId(@Param("userId") int userId, @Param("projectId") int projectId);

    List<Bug> findByUser_IdAndProject_Id(int userid,int projectid);

    @Query("SELECT COUNT(b) FROM Bug b WHERE b.project.id = :projectId AND UPPER(b.status) <> 'CLOSED'")
    int countActiveBugsByProjectId(@Param("projectId") int projectId);

    List<Bug> findByUser_Id(int userid);

    //Counts Bugs Assigned to a particular User
    int countByUser_Id(int userid);

    @Query("SELECT COUNT(b) FROM Bug b WHERE b.user.id = :userId AND UPPER(b.status) <> 'CLOSED'")
    int countActiveBugsByUserId(@Param("userId") int userId);

}



