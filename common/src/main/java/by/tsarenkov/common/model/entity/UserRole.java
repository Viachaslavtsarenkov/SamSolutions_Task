package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "role")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserRole implements Serializable {

    @Id
    @Column(name = "id_role")
    private Long id;
    private Role role;
    @OneToMany
    @JsonIgnore
    @ToString.Exclude
    private Set<User> users = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserRole userRole = (UserRole) o;
        return Objects.equals(id, userRole.id)
                && role == userRole.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, role);
    }
}
