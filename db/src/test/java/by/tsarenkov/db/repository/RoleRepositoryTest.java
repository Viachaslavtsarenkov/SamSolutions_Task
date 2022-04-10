package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.db.config.JpaTestConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    private final UserRole role = UserRole
            .builder()
            .role(Role.ROLE_ADMIN)
            .build();

    @Test
    public void ShouldSaveRole() {
        roleRepository.save(role);
        assertThat(role.getId()).isNotEqualTo(0);
    }
}
