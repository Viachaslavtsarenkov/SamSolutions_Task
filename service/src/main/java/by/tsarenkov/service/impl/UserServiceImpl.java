package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.dto.ActivationDto;
import by.tsarenkov.common.model.dto.UserDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.common.model.payload.UserPageResponse;
import by.tsarenkov.db.repository.RoleRepository;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.ActivationAccountException;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.exception.UserNotFoundException;
import by.tsarenkov.service.util.CodeGenerator;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static by.tsarenkov.service.constants.LogMessage.LOG_CREATED_MSG;
import static by.tsarenkov.service.constants.MessageResponse.EMAIL_ALREADY_TAKEN;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailServiceImpl mailService;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public User registerUser(User user) throws EmailAlreadyTakenException {

        if(userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyTakenException(EMAIL_ALREADY_TAKEN);
        }

        String code = CodeGenerator.generateCode();
        UserRole userRole = Optional.of(roleRepository.findById(2L)).get().orElseThrow();
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    public UserPageResponse findAllUsers(int page, int size) {
        Page<User> users = userRepository.findAll(PageRequest.of(page, size));
        return new UserPageResponse(users.getContent(), users.getTotalPages());
    }

    @Override
    @Transactional
    public User getUserById(Long id) throws UserNotFoundException {
        User user = Optional.of(userRepository.findById(id)).get()
                .orElseThrow(UserNotFoundException::new);
        user.getOrders().size();
        return user;
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
