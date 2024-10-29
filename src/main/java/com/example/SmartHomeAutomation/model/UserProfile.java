package com.example.SmartHomeAutomation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String username;
    private String email;
    private Integer role;

    private UserProfile() {
    }

    public UserProfile(String username, String email, Integer role) {
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Integer getRole() {
        return role;
    }
}
