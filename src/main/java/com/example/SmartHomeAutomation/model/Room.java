package com.example.SmartHomeAutomation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "room_name")
    private String roomName;

    private Room() {
    }

    public Room(String roomName) {
        this.roomName = roomName;
    }

    public Integer getId() {
        return id;
    }

    public String getRoom_name() {
        return roomName;
    }

    public void setRoom_name(String roomName) {
        this.roomName = roomName;
    }
}
