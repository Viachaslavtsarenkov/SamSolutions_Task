package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.MailAlreadyInUse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public void setUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) throws MailAlreadyInUse {
        //todo validation
        // todo SECURITY
        if (checkUserByEmail(user.getEmail())) {
            throw new MailAlreadyInUse();
        } else {
            user.setStatus(UserStatus.NO_ACTIVATED);
            user.setRole(UserRole.builder()
                    .role(Role.CUSTOMER).build());
        }
        return userRepository.save(user);
    }

    @Override
    public boolean checkUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return null;//userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return getUserById(id);
    }

    @Override
    public void updateUserStatus(Long id, UserStatus status) {
        userRepository.changeUserStatus(id, status);
    }
}
