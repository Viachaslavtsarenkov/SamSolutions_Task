package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Role;
import lombok.*;
import org.hibernate.annotations.CollectionId;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user_role")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class UserRole implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_role")
    private Long id;
    @Column(name = "role")
    private Role role;
    @OneToMany(mappedBy = "role")
    private List<User> user = new ArrayList<>();

    @Override
    public String getAuthority() {
        return role.toString();
    }
}
