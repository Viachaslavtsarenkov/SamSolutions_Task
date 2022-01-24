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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_role")
    private int id;
    @Column(name = "role")
    private Role role;
    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER)
    private Collection<User> user;
}
