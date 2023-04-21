package ac.cr.ucr.controller;

import ac.cr.ucr.model.CustomAttribute;
import ac.cr.ucr.repository.functional.CustomAttributeInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/custom-attributes")
@CrossOrigin
public class CustomAttributeController {

    @Autowired
    private CustomAttributeInterface customAttributeInterface;

    @GetMapping("/{customAttributeUuid}")
    public CustomAttribute getCustomAttribute(@PathVariable UUID customAttributeUuid) {
        return customAttributeInterface.findCustomAttribute(customAttributeUuid);
    }

    @GetMapping
    public List<CustomAttribute> getAllCustomAttributes() {
        return customAttributeInterface.findAllCustomAttributes();
    }

    @PostMapping
    public CustomAttribute addCustomAttribute(@RequestBody CustomAttribute customAttribute) {
        return customAttributeInterface.addCustomAttribute(customAttribute);
    }

    @PutMapping("/{customAttributeUuid}")
    public CustomAttribute updateCustomAttribute(@RequestBody CustomAttribute customAttribute, @PathVariable UUID customAttributeUuid) {
        return customAttributeInterface.updateCustomAttribute(customAttribute, customAttributeUuid);
    }

    @DeleteMapping("/{customAttributeUuid}")
    public boolean deleteCustomAttribute(@PathVariable UUID customAttributeUuid) {
        return customAttributeInterface.deleteCustomAttribute(customAttributeUuid);
    }
}
