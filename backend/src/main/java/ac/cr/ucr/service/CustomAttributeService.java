package ac.cr.ucr.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.model.Reservation;
import ac.cr.ucr.repository.CustomAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import ac.cr.ucr.model.CustomAttribute;
import org.springframework.stereotype.Service;

@Service
public class CustomAttributeService {

    @Autowired
    private CustomAttributeRepository repository;

    public CustomAttribute findCustomAttribute(UUID customAttributeUuid) {
        return repository.findById(customAttributeUuid).get();
    }
    public List<CustomAttribute> findAllCustomAttributes() {
        return repository.findAll();
    }

    public List<CustomAttribute> findByRoomAvailabilityUuid(UUID roomAvailabilityUuid) {
        return repository.findByRoomAvailabilityUuid(roomAvailabilityUuid);
    }
    public CustomAttribute addCustomAttribute(CustomAttribute customAttribute) {
        CustomAttribute newCustomAttribute = customAttribute;
        return repository.save(newCustomAttribute);
    }

    public CustomAttribute updateCustomAttribute(CustomAttribute customAttribute, UUID customAttributeUuid) {
        Optional<CustomAttribute> existingCustomAttribute = repository.findById(customAttributeUuid);
        if (existingCustomAttribute.isPresent()) {
            return repository.save(customAttribute);
        }
        return null;
    }

    public boolean deleteCustomAttribute(UUID customAttributeUuid) {
        Optional<CustomAttribute> existingCustomAttribute = repository.findById(customAttributeUuid);
        if (existingCustomAttribute.isPresent()) {
            repository.delete(existingCustomAttribute.get());
            return true;
        }
        return false;
    }
}
