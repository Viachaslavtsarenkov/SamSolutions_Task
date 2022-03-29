package by.service.impl;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.impl.UserServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@MockitoSettings(strictness = Strictness.LENIENT)
public class UserServiceImplTest {

    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private UserRepository userRepository;
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

    @Test
    public void ShouldRegisterUser()
            throws EmailAlreadyTakenException {
        given(userRepository.existsByEmail(user.getEmail())).willReturn(false);
        given(passwordEncoder.encode(user.getEmail())).willReturn(password);
        userService.registerUser(user);
        assertThat(user.getRole()).isEqualTo(Role.ROLE_CUSTOMER);
        assertThat(user.getPassword()).isEqualTo(password);
        assertThat(user.getStatus()).isEqualTo(UserStatus.NO_ACTIVATED);
        assertThat(user.getCode()).isNotEmpty();
    }

    @Test
    public void ShouldThrowEMailAlreadyTakenException() {
        given(userRepository.existsByEmail(user.getEmail())).willReturn(true);
        assertThatThrownBy(() -> userService.registerUser(user))
                .isInstanceOf(EmailAlreadyTakenException.class);
    }
}
