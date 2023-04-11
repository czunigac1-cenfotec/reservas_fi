package ac.cr.ucr.controller;

import ac.cr.ucr.model.Resource;
import ac.cr.ucr.service.ResourceService;
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
    private ResourceService resourceService;

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable("id") UUID id) {
        Resource resource = resourceService.findResource(id);
        if (resource == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resource);
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        List<Resource> resources = resourceService.findAllResources();
        if (resources.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(resources);
    }

    @PostMapping
    public ResponseEntity<Resource> addResource(@RequestBody Resource resource) {
        Resource newResource = resourceService.addResource(resource);
        if (newResource == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(newResource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> updateResource(@PathVariable("id") UUID id, @RequestBody Resource resource) {
        Resource updatedResource = resourceService.updateResource(resource, id);
        if (updatedResource == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedResource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable("id") UUID id) {
        boolean success = resourceService.deleteResource(id);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
