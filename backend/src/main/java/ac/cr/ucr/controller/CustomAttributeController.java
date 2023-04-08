package ac.cr.ucr.controller;

import ac.cr.ucr.model.CustomAttribute;
import ac.cr.ucr.service.CustomAttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/custom-attributes")
@CrossOrigin
public class CustomAttributeController {

    @Autowired
    private CustomAttributeService customAttributeService;

    @GetMapping("/{customAttributeUuid}")
    public CustomAttribute getCustomAttribute(@PathVariable UUID customAttributeUuid) {
        return customAttributeService.findCustomAttribute(customAttributeUuid);
    }

    @GetMapping
    public List<CustomAttribute> getAllCustomAttributes() {
        return customAttributeService.findAllCustomAttributes();
    }

    @PostMapping
    public CustomAttribute addCustomAttribute(@RequestBody CustomAttribute customAttribute) {
        return customAttributeService.addCustomAttribute(customAttribute);
    }

    @PutMapping("/{customAttributeUuid}")
    public CustomAttribute updateCustomAttribute(@RequestBody CustomAttribute customAttribute, @PathVariable UUID customAttributeUuid) {
        return customAttributeService.updateCustomAttribute(customAttribute, customAttributeUuid);
    }

    @DeleteMapping("/{customAttributeUuid}")
    public boolean deleteCustomAttribute(@PathVariable UUID customAttributeUuid) {
        return customAttributeService.deleteCustomAttribute(customAttributeUuid);
    }
}
