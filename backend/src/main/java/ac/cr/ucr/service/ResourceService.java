package ac.cr.ucr.service;

import ac.cr.ucr.model.Resource;

import java.util.List;
import java.util.UUID;

public interface ResourceService {
    Resource findResource(UUID resourceUuid);

    List<Resource> findAllResources();

    Resource addResource(Resource resource);

    Resource updateResource(Resource resource, UUID resourceUuid);

    boolean deleteResource(UUID resourceUuid);
}
