package ac.cr.ucr.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Room implements Serializable {

    @Id
    private UUID roomUuid;

    private String code;

    private String name;

    private String description;

    private String location;

    private int capacity;

    private UUID administratorUuid;

    private LocalDateTime creationDateTime;

    public Room() {
        this.roomUuid = UUID.randomUUID();
        this.creationDateTime = LocalDateTime.now();
    }

    public Room(String code, String name, String description, String location, int capacity, UUID administratorUuid) {
        this();
        this.code = code;
        this.name = name;
        this.description = description;
        this.location = location;
        this.capacity = capacity;
        this.administratorUuid = administratorUuid;
    }

    public UUID getRoomUuid() {
        return roomUuid;
    }

    public void setRoomUuid(UUID roomUuid) {
        this.roomUuid = roomUuid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public UUID getAdministratorUuid() {
        return administratorUuid;
    }

    public void setAdministratorUuid(UUID administratorUuid) {
        this.administratorUuid = administratorUuid;
    }

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    @Override
    public String toString() {
        return "{"
                + "\"roomUuid\": \"" + roomUuid + "\", "
                + "\"code\": \"" + code + "\", "
                + "\"name\": \"" + name + "\", "
                + "\"description\": \"" + description + "\", "
                + "\"location\": \"" + location + "\", "
                + "\"capacity\": " + capacity + ", "
                + "\"administratorUuid\": \"" + administratorUuid + "\", "
                + "\"creationDate\": \"" + creationDateTime.toString() + "\""
                + "}";
    }


}
