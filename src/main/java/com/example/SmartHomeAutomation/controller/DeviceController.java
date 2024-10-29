package com.example.SmartHomeAutomation.controller;

import com.example.SmartHomeAutomation.model.SmartDevice;
import com.example.SmartHomeAutomation.model.UserProfile;
import com.example.SmartHomeAutomation.repo.DeviceRepository;
import com.example.SmartHomeAutomation.repo.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class DeviceController {

    @Autowired
    private final DeviceRepository deviceRepository;

    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @PostMapping("/addDevice")
    public SmartDevice addDevice(@RequestBody SmartDevice smartDevice) {
        return deviceRepository.save(smartDevice);
    }

    @GetMapping("/getAllDevice")
    public List<SmartDevice> getAllDevices() {
        return deviceRepository.findAllByOrderByIdDesc();
    }

    @DeleteMapping("/deleteDevice/{id}")
    public void deleteSmartDevice(@PathVariable Integer id) {
        deviceRepository.deleteById(id);
    }

    @PutMapping("/updateDevice/{id}")
    public SmartDevice updateSmartDevice(@PathVariable Integer id, @RequestBody SmartDevice smartDevice) {
        Optional<SmartDevice> optionalSmartDevice = deviceRepository.findById(id);
        if (optionalSmartDevice.isPresent()) {
            SmartDevice existingSmartDevice = optionalSmartDevice.get();
            existingSmartDevice.setDevice_name(smartDevice.getDevice_name());
            existingSmartDevice.setDevice_type(smartDevice.getDevice_type());
            existingSmartDevice.setRoom_id(smartDevice.getRoom_id());
            return deviceRepository.save(existingSmartDevice);
        } else {
            throw new RuntimeException("Device not found with id " + id);
        }
    }
}
