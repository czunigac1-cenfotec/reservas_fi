package ac.cr.ucr.controller;

import ac.cr.ucr.model.Resource;
import ac.cr.ucr.repository.functional.ResourceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    private ResourceInterface resourceInterface;

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable("id") UUID id) {
        Resource resource = resourceInterface.findResource(id);
        if (resource == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resource);
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        List<Resource> resources = resourceInterface.findAllResources();
        if (resources.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(resources);
    }

    @PostMapping
    public ResponseEntity<Resource> addResource(@RequestBody Resource resource) {
        Resource newResource = resourceInterface.addResource(resource);
        if (newResource == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(newResource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable("id") UUID id, @RequestBody Resource resource) {
        Resource updatedResource = resourceInterface.updateResource(resource, id);
        if (updatedResource == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedResource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable("id") UUID id) {
        boolean success = resourceInterface.deleteResource(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
