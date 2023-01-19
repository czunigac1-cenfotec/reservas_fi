package ac.cr.ucr.service;

import java.util.List;
import java.util.UUID;

import ac.cr.ucr.model.UserInfo;

public interface UserInfoService {
    UserInfo findUserInfo(UUID userInfoId);

    List<UserInfo> findAllUserInfo();

    UserInfo addUserInfo(UserInfo userInfo);

    UserInfo updateUserInfo(UserInfo userInfo);

    boolean deleteUserInfo(UUID userInfoId);

}