package ac.cr.ucr.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ac.cr.ucr.model.UserInfo;
import ac.cr.ucr.service.UserInfoService;

@RequestMapping("/userInfo")
@CrossOrigin
@RestController
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping
    public List<UserInfo> getAllUserInfo() {
        return this.userInfoService.findAllUserInfo();
    }

    @GetMapping("/{uuid}")
    public UserInfo getUserInfo(@PathVariable("uuid") UUID uuid) {
        return this.userInfoService.findUserInfo(uuid);
    }


    @PostMapping
    public UserInfo addUserInfo(@RequestBody UserInfo userInfo) {
        return this.userInfoService.addUserInfo(userInfo);
    }

    @PutMapping("/{uuid}")
    public UserInfo updateUserInfo(@PathVariable("uuid") UUID uuid, @RequestBody UserInfo userInfo) {
        return this.userInfoService.updateUserInfo(userInfo, uuid);

    }

    @DeleteMapping("/{uuid}")
    public boolean deleteUserInfo(@PathVariable("uuid") UUID uuid) {
        return this.userInfoService.deleteUserInfo(uuid);
    }


}
