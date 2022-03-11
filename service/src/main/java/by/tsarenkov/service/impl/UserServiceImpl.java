package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.dto.ActivationDto;
import by.tsarenkov.common.model.dto.UserDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.ActivationAccountException;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.util.CodeGenerator;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static by.tsarenkov.service.constants.LogMessage.LOG_CREATED_MSG;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private MailServiceImpl mailService;


    @Autowired
    public void setMailService(MailServiceImpl mailService) {
        this.mailService = mailService;
    }

    @Autowired
    private void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User registerUser(User user) throws EmailAlreadyTakenException {

        if(userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyTakenException();
        }

        String code = CodeGenerator.generateCode();

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.CUSTOMER);
        user.setStatus(UserStatus.NO_ACTIVATED);
        user.setCode(code);

        mailService.sendActivationMail(user.getEmail(), code);
        userRepository.save(user);
        return user;
    }

    @Override
    @Transactional
    public boolean checkUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    @Transactional
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    @Override
    @Transactional
    public User getUserById(Long id) {
        return getUserById(id);
    }

    @Override
    @Transactional
    public void updateUserStatus(Long id, UserStatus status) {
        userRepository.changeUserStatus(id, status);
    }

    @Override
    @Transactional
    public void activateAccount(ActivationDto activationDto)
            throws ActivationAccountException {
        userRepository.activateUser(activationDto.getEmail(),
                UserStatus.ACTIVE,
                activationDto.getCode());
    }
}
