package ac.cr.ucr.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ac.cr.ucr.model.CustomAttribute;
import ac.cr.ucr.repository.functional.CustomAttributeInterface;

@Service("customAttributeService")
public class CustomAttributeRepositoryI implements CustomAttributeInterface {

    @Autowired
    private CustomAttributeRepository repository;

    @Override
    public CustomAttribute findCustomAttribute(UUID customAttributeUuid) {
        return repository.findById(customAttributeUuid).get();
    }

    @Override
    public List<CustomAttribute> findAllCustomAttributes() {
        return repository.findAll();
    }

    @Override
    public CustomAttribute addCustomAttribute(CustomAttribute customAttribute) {
        CustomAttribute newCustomAttribute = customAttribute;
        return repository.save(newCustomAttribute);
    }

    @Override
    public CustomAttribute updateCustomAttribute(CustomAttribute customAttribute, UUID customAttributeUuid) {
        Optional<CustomAttribute> existingCustomAttribute = repository.findById(customAttributeUuid);
        if (existingCustomAttribute.isPresent()) {
            return repository.save(customAttribute);
        }
        return null;
    }

    @Override
    public boolean deleteCustomAttribute(UUID customAttributeUuid) {
        return false;
    }
}
