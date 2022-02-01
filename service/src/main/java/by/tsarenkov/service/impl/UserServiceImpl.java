package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setUser(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasRole('GUEST')")
    @Override
    public User registerUser(User user) {
        user.setStatus(UserStatus.NO_ACTIVATED);
        user.setPassword(passwordEncoder.encode(new String(user.getPassword())).toCharArray());
        user.setRole(UserRole.builder()
                .role(Role.CUSTOMER).build());
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
