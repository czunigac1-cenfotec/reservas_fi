package ac.cr.ucr.service;

import ac.cr.ucr.model.Resource;
import ac.cr.ucr.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository repository;

    public Resource findResource(UUID resourceUuid) {
        Optional<Resource> resource = repository.findById(resourceUuid);
        return resource.orElse(null);
    }

    public List<Resource> findAllResources() {
        return repository.findAll();
    }

    public Resource addResource(Resource resource) {
        resource.setResourceUuid(UUID.randomUUID());
        resource.setCreationDateTime(LocalDateTime.now());
        return repository.save(resource);
    }

    public Resource updateResource(Resource resource, UUID resourceUuid) {
        Optional<Resource> existingResource = repository.findById(resourceUuid);
        if (existingResource.isPresent()) {
            Resource updatedResource = existingResource.get();
            updatedResource.setName(resource.getName());
            updatedResource.setDescription(resource.getDescription());
            return repository.save(updatedResource);
        }
        return null;
    }

    public boolean deleteResource(UUID resourceUuid) {
        Optional<Resource> existingResource = repository.findById(resourceUuid);
        if (existingResource.isPresent()) {
            repository.delete(existingResource.get());
            return true;
        }
        return false;
    }
}
