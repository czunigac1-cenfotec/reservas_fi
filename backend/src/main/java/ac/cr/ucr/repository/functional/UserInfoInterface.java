package ac.cr.ucr.repository.functional;

import java.util.List;
import java.util.UUID;

import ac.cr.ucr.model.UserInfo;

public interface UserInfoInterface {
    UserInfo findUserInfo(UUID userInfoId);

    List<UserInfo> findAllUserInfo();

    UserInfo addUserInfo(UserInfo userInfo);

    UserInfo updateUserInfo(UserInfo userInfo, UUID uuid);

    boolean deleteUserInfo(UUID userInfoId);

}