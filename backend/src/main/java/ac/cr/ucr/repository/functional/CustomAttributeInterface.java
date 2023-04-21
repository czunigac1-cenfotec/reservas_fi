package ac.cr.ucr.repository.functional;

import ac.cr.ucr.model.CustomAttribute;

import java.util.List;
import java.util.UUID;

public interface CustomAttributeInterface {

    CustomAttribute findCustomAttribute(UUID customAttributeUuid);

    List<CustomAttribute> findAllCustomAttributes();

    CustomAttribute addCustomAttribute(CustomAttribute customAttribute);

    CustomAttribute updateCustomAttribute(CustomAttribute customAttribute, UUID customAttributeUuid);

    boolean deleteCustomAttribute(UUID customAttributeUuid);
}
