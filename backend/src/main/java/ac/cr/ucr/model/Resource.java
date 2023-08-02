package ac.cr.ucr.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Resource {

    @Id
    private UUID resourceUuid;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private LocalDateTime creationDateTime;

    public Resource() {
        this.resourceUuid = UUID.randomUUID();
        this.creationDateTime = LocalDateTime.now();
    }

    public Resource(String name, String description, LocalDateTime creationDateTime) {
        this();
        this.name = name;
        this.description = description;
    }

    public UUID getResourceUuid() {
        return resourceUuid;
    }

    public void setResourceUuid(UUID resourceUuid) {
        this.resourceUuid = resourceUuid;
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

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }
}
