package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.Resource;

import java.util.List;
import java.util.UUID;

public interface ResourceInterface {
    Resource findResource(UUID resourceUuid);

    List<Resource> findAllResources();

    Resource addResource(Resource resource);

    Resource updateResource(Resource resource, UUID resourceUuid);

    boolean deleteResource(UUID resourceUuid);
}
