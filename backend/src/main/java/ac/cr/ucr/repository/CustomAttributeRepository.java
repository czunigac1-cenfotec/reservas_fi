package ac.cr.ucr.repository;

import ac.cr.ucr.model.CustomAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository("customAttributeRepository")
public interface CustomAttributeRepository extends JpaRepository<CustomAttribute, UUID> {
}
