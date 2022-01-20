package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Role;
import lombok.*;
import org.hibernate.annotations.CollectionId;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "user_role")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class UserRole {
    @Id
    @Column(name = "id_role")
    private int id;
    @Column(name = "role")
    private Role role;
    @OneToMany
    private Collection<User> user;
}
