package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.dto.ActivationDto;
import by.tsarenkov.common.model.dto.SignUpDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.ActivationAccountException;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.util.CodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private MailServiceImpl mailService;

    @Autowired
    public void setMailService(MailServiceImpl mailService) {
        this.mailService = mailService;
    }

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

    @Override
    public User registerUser(SignUpDto userDto) throws EmailAlreadyTakenException {

        if(checkUserByEmail(userDto.getEmail())) {
            throw new EmailAlreadyTakenException();
        }

        String code = CodeGenerator.generateCode();

        User user = User.builder()
                .name(userDto.getName())
                .surname(userDto.getSurname())
                .patronymic(userDto.getPatronymic())
                .phoneNumber(userDto.getPhoneNumber())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .email(userDto.getEmail())
                .role(Role.CUSTOMER)
                .status(UserStatus.NO_ACTIVATED)
                .build();
        user.setCode(code);
        mailService.sendActivationMail(user.getEmail(), code);
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
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        System.out.println(users);
        return users;
    }

    @Override
    public User getUserById(Long id) {
        return getUserById(id);
    }

    @Override
    public void updateUserStatus(Long id, UserStatus status) {
        userRepository.changeUserStatus(id, status);
    }

    @Override
    public void activateAccount(ActivationDto activationDto) throws ActivationAccountException {
        userRepository.activateUser(activationDto.getEmail(),
                UserStatus.ACTIVE,
                activationDto.getCode());
    }
}
