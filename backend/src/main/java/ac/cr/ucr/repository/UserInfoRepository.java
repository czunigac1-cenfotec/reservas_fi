package ac.cr.ucr.repository;

import java.util.List;
import java.util.UUID;

import ac.cr.ucr.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ac.cr.ucr.model.UserInfo;



@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, UUID> {
    @Query("SELECT u from UserInfo u where u.email = ?1")
    UserInfo findUserInfoByEmail(String email);

}
