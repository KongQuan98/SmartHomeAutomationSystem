package com.example.SmartHomeAutomation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "smart_device")
public class SmartDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String device_name;
    private String device_type;
    private Integer room_id;

    private SmartDevice() {
    }

    public SmartDevice(String device_name, String device_type, Integer room_id) {
        this.device_name = device_name;
        this.device_type = device_type;
        this.room_id = room_id;
    }

    public Integer getId() {
        return id;
    }

    public String getDevice_name() {
        return device_name;
    }

    public void setDevice_name(String device_name) {
        this.device_name = device_name;
    }

    public String getDevice_type() {
        return device_type;
    }

    public void setDevice_type(String device_type) {
        this.device_type = device_type;
    }

    public Integer getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Integer room_id) {
        this.room_id = room_id;
    }
}
