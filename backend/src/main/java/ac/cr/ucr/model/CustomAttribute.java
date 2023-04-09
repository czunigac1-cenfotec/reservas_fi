package ac.cr.ucr.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CustomAttribute {

    @Id
    private UUID customAttributeUuid;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private UUID roomAvailabilityUuid;

    public CustomAttribute() {
        this.customAttributeUuid = UUID.randomUUID();
    }

    public CustomAttribute(String title, String description, UUID roomAvailabilityUuid) {
        this();
        this.title = title;
        this.description = description;
        this.roomAvailabilityUuid = roomAvailabilityUuid;
    }

    public UUID getCustomAttributeUuid() {
        return customAttributeUuid;
    }

    public void setCustomAttributeUuid(UUID customAttributeUuid) {
        this.customAttributeUuid = customAttributeUuid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UUID getRoomAvailabilityUuid() {
        return roomAvailabilityUuid;
    }

    public void setRoomAvailabilityUuid(UUID roomAvailabilityUuid) {
        this.roomAvailabilityUuid = roomAvailabilityUuid;
    }

    @Override
    public String toString() {
        return "{" +
                "\"customAttributeUuid\":\"" + customAttributeUuid + "\"," +
                "\"title\":\"" + title + "\"," +
                "\"description\":\"" + description + "\"," +
                "\"roomAvailabilityUuid\":\"" + roomAvailabilityUuid + "\"" +
                "}";
    }
}
