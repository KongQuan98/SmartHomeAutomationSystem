package com.example.SmartHomeAutomation.repo;

import com.example.SmartHomeAutomation.model.SmartDevice;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeviceRepository extends CRUDRepository<SmartDevice, Integer> {
    @Query("SELECT d FROM SmartDevice d ORDER BY d.id DESC")
    List<SmartDevice> findAllByOrderByIdDesc();
}
