package ac.cr.ucr.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import ac.cr.ucr.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import ac.cr.ucr.model.UserInfo;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository repository;

    public UserInfo findUserInfo(UUID userInfoId) {
        return repository.findById(userInfoId).get();
    }
    public UserInfo findUserInfoByEmail(String email) {
        return repository.findUserInfoByEmail(email);
    }

    public List<UserInfo> findAllUserInfo() {
        return repository.findAll();
    }

    public UserInfo addUserInfo(UserInfo userInfo) {
        UserInfo newUserInfo = userInfo;
        return repository.save(newUserInfo);
    }

    public UserInfo updateUserInfo(UserInfo userInfo, UUID uuid) {
        Optional<UserInfo> existingUserInfo = repository.findById(uuid);
        if (existingUserInfo.isPresent()) {
            return repository.save(userInfo);
        }
        return null;
    }

    public boolean deleteUserInfo(UUID userInfoId) {
        Optional<UserInfo> existingUserInfo = repository.findById(userInfoId);
        if (existingUserInfo.isPresent()) {
            repository.delete(existingUserInfo.get());
            return true;
        }
        return false;
    }
}