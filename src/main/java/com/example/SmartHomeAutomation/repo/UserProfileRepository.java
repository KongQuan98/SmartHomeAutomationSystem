package com.example.SmartHomeAutomation.repo;

import com.example.SmartHomeAutomation.model.UserProfile;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProfileRepository extends CRUDRepository<UserProfile, Integer> {
    @Query("SELECT u FROM UserProfile u ORDER BY u.id ASC")
    List<UserProfile> findAllByOrderByIdASC();
}
