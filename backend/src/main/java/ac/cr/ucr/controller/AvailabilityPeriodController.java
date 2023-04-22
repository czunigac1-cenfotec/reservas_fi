package ac.cr.ucr.controller;

import ac.cr.ucr.model.AvailabilityPeriod;
import ac.cr.ucr.repository.functional.AvailabilityPeriodInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/availabilityPeriod")
@CrossOrigin
@RestController
public class AvailabilityPeriodController {

    @Autowired
    private AvailabilityPeriodInterface availabilityPeriodInterface;

    @GetMapping("/{uuid}")
    public AvailabilityPeriod getAvailabilityPeriod(@PathVariable("uuid") UUID availabilityPeriodId) {
        return this.availabilityPeriodInterface.findAvailabilityPeriod(availabilityPeriodId);
    }

    @GetMapping
    public List<AvailabilityPeriod> getAllAvailabilityPeriods() {
        return this.availabilityPeriodInterface.findAllAvailabilityPeriods();
    }

    @PostMapping
    public AvailabilityPeriod addAvailabilityPeriod(@RequestBody AvailabilityPeriod availabilityPeriod) {
        return this.availabilityPeriodInterface.addAvailabilityPeriod(availabilityPeriod);
    }

    @PutMapping("/{uuid}")
    public AvailabilityPeriod updateAvailabilityPeriod(@PathVariable("uuid") UUID availabilityPeriodId, @RequestBody AvailabilityPeriod availabilityPeriod) {
        return this.availabilityPeriodInterface.updateAvailabilityPeriod(availabilityPeriod, availabilityPeriodId);
    }

    @DeleteMapping("/{uuid}")
    public boolean deleteAvailabilityPeriod(@PathVariable("uuid") UUID availabilityPeriodId) {
        return this.availabilityPeriodInterface.deleteAvailabilityPeriod(availabilityPeriodId);
    }
}
