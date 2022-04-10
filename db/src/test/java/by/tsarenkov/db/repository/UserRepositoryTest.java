package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.config.JpaTestConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private final User user = User.builder()
            .surname("Tsarankou")
            .name("Viachaslau")
            .code("activation code")
            .email("tsarenkovslava@yandex.ru")
            .status(UserStatus.NO_ACTIVATED)
            .password("password")
            .build();

    @Test
    public void ShouldSaveUser() {
        userRepository.save(user);
        assertThat(user.getId()).isNotEqualTo(0);
    }

    @Test
    public void ShouldCheckUserExistingByEmail() {
        userRepository.save(user);
        assertThat(userRepository.existsByEmail(user.getEmail())).isTrue();
    }

}
