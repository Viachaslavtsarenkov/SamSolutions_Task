package by.service.impl;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.RoleRepository;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.UserService;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.impl.MailServiceImpl;
import by.tsarenkov.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
public class UserServiceImplTest {

    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private UserRepository userRepository;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    MailServiceImpl mailService;

    @InjectMocks
    private UserServiceImpl userService;

    private static final String password = "sfhakjhrtkljsdfbslkrh";

    private User user = User.builder()
            .name("Viachaslau")
            .surname("Tsarankou")
            .phoneNumber("+375332429292")
            .password("123456789")
            .patronymic("Yurivech")
            .email("tsarenkvoslava@yandex.ru")
            .build();

    private UserRole role = UserRole.builder()
            .id(2L)
            .role(Role.ROLE_CUSTOMER).build();

    @Test
    public void shouldRegisterUser()
            throws EmailAlreadyTakenException {
        given(userRepository.existsByEmail(user.getEmail())).willReturn(false);
        given(roleRepository.findById(2L)).willReturn(Optional.of(role));
        given(passwordEncoder.encode(user.getPassword())).willReturn(password);
        given(mailService.sendActivationMail(user.getEmail(), password)).willReturn(true);
        userService.registerUser(user);
        assertThat(user.getPassword()).isEqualTo(password);
        assertThat(user.getStatus()).isEqualTo(UserStatus.NO_ACTIVATED);
        assertThat(user.getCode()).isNotEmpty();
        assertThat(user.getRole().getId()).isEqualTo(2L);
        verify(userRepository).save(user);
    }

    @Test
    public void shouldThrowEMailAlreadyTakenException(){
        given(userRepository.existsByEmail(user.getEmail())).willReturn(true);
        assertThatThrownBy(() -> userService.registerUser(user))
                .isInstanceOf(EmailAlreadyTakenException.class);
    }
}
