package com.example.SmartHomeAutomation.controller;

import com.example.SmartHomeAutomation.model.UserProfile;
import com.example.SmartHomeAutomation.repo.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserProfileController {

    @Autowired
    private final UserProfileRepository userProfileRepository;

    public UserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @PostMapping("/addUser")
    public UserProfile addUser(@RequestBody UserProfile userProfile) {
        return userProfileRepository.save(userProfile);
    }

    @GetMapping("/getAllUser")
    public Iterable<UserProfile> getAllUser() {
        return userProfileRepository.findAllByOrderByIdASC();
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userProfileRepository.deleteById(id);
    }

    @PutMapping("/updateUser/{id}")
    public UserProfile updateUser(@PathVariable Integer id, @RequestBody UserProfile userProfile) {
        Optional<UserProfile> optionalUserProfile = userProfileRepository.findById(id);
        if (optionalUserProfile.isPresent()) {
            UserProfile existingUserProfile = optionalUserProfile.get();
            existingUserProfile.setUsername(userProfile.getUsername());
            existingUserProfile.setEmail(userProfile.getEmail());
            existingUserProfile.setRole(userProfile.getRole());
            return userProfileRepository.save(existingUserProfile);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }
}
