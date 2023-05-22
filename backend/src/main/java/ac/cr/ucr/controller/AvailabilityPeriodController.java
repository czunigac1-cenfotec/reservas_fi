package ac.cr.ucr.controller;

import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.service.AvailabilityPeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/availabilityPeriod")
@CrossOrigin
@RestController
public class AvailabilityPeriodController {

    @Autowired
    private AvailabilityPeriodService availabilityPeriodService;

    @GetMapping("/{uuid}")
    public AvailabilityPeriod getAvailabilityPeriod(@PathVariable("uuid") UUID availabilityPeriodId) {
        return this.availabilityPeriodService.findAvailabilityPeriod(availabilityPeriodId);
    }

    @GetMapping
    public List<AvailabilityPeriod> getAllAvailabilityPeriods() {
        return this.availabilityPeriodService.findAllAvailabilityPeriods();
    }

    @PostMapping
    public AvailabilityPeriod addAvailabilityPeriod(@RequestBody AvailabilityPeriod availabilityPeriod) {
        return this.availabilityPeriodService.addAvailabilityPeriod(availabilityPeriod);
    }

    @PutMapping("/{uuid}")
    public AvailabilityPeriod updateAvailabilityPeriod(@PathVariable("uuid") UUID availabilityPeriodId, @RequestBody AvailabilityPeriod availabilityPeriod) {
        return this.availabilityPeriodService.updateAvailabilityPeriod(availabilityPeriod, availabilityPeriodId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteAvailabilityPeriod(@PathVariable("uuid") UUID availabilityPeriodId) {
        return this.availabilityPeriodService.deleteAvailabilityPeriod(availabilityPeriodId);
    }
}
