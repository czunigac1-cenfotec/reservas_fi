package ac.cr.ucr.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ac.cr.ucr.repository.functional.UserInfoInterface;
import ac.cr.ucr.model.UserInfo;

@Service("userInfo")
public class UserInfoRepositoryI implements UserInfoInterface {

    @Autowired
    private UserInfoRepository repository;

    @Override
    public UserInfo findUserInfo(UUID userInfoId) {
        return repository.findById(userInfoId).get();
    }

    @Override
    public List<UserInfo> findAllUserInfo() {
        return repository.findAll();
    }

    @Override
    public UserInfo addUserInfo(UserInfo userInfo) {
        UserInfo newUserInfo = userInfo;
        return repository.save(newUserInfo);
    }

    @Override
    public UserInfo updateUserInfo(UserInfo userInfo, UUID uuid) {
        Optional<UserInfo> existingUserInfo = repository.findById(uuid);
        if (existingUserInfo.isPresent()) {
            return repository.save(userInfo);
        }
        return null;
    }

    @Override
    public boolean deleteUserInfo(UUID userInfoId) {
        Optional<UserInfo> existingUserInfo = repository.findById(userInfoId);
        if (existingUserInfo.isPresent()) {
            repository.delete(existingUserInfo.get());
            return true;
        }
        return false;
    }
}