package ac.cr.ucr.repository;

import ac.cr.ucr.model.Resource;
import ac.cr.ucr.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service("resource")
public class ResourceRepositoryI implements ResourceService {

    @Autowired
    private ResourceRepository repository;

    @Override
    public Resource findResource(UUID resourceUuid) {
        Optional<Resource> resource = repository.findById(resourceUuid);
        return resource.orElse(null);
    }

    @Override
    public List<Resource> findAllResources() {
        return repository.findAll();
    }

    @Override
    public Resource addResource(Resource resource) {
        resource.setResourceUuid(UUID.randomUUID());
        resource.setCreationDateTime(LocalDateTime.now());
        return repository.save(resource);
    }

    @Override
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

    @Override
    public boolean deleteResource(UUID resourceUuid) {
        Optional<Resource> existingResource = repository.findById(resourceUuid);
        if (existingResource.isPresent()) {
            repository.delete(existingResource.get());
            return true;
        }
        return false;
    }
}
