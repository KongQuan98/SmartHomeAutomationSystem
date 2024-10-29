package com.example.SmartHomeAutomation;

import com.example.SmartHomeAutomation.model.UserProfile;
import com.example.SmartHomeAutomation.repo.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@SpringBootApplication
public class SmartHomeAutomationApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartHomeAutomationApplication.class, args);
        System.out.println("Hello World");
    }
}
