package com.example.SmartHomeAutomation.controller;

import com.example.SmartHomeAutomation.model.Room;
import com.example.SmartHomeAutomation.repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class RoomController {

    @Autowired
    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @PostMapping("/addRoom")
    public Room addRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @GetMapping("/getAllRoom")
    public Iterable<Room> getAllRoom() {
        return roomRepository.findAll();
    }

    @GetMapping("/getRoom/{room_id}")
    public Room getRoom(@PathVariable("room_id") Integer id) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            return optionalRoom.get();
        } else {
            throw new RuntimeException("Room not found with id " + id);
        }
    }

    @DeleteMapping("/deleteRoom/{id}")
    public void deleteRoom(@PathVariable Integer id) {
        roomRepository.deleteById(id);
    }

    @PutMapping("/updateRoom/{id}")
    public Room updateRoom(@PathVariable Integer id, @RequestBody Room room) {
        Optional<Room> optionalRoom = roomRepository.findById(id);
        if (optionalRoom.isPresent()) {
            Room existingRoom = optionalRoom.get();
            existingRoom.setRoom_name(room.getRoom_name());
            return roomRepository.save(existingRoom);
        } else {
            throw new RuntimeException("Room not found with id " + id);
        }
    }
}
