package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import com.fasterxml.jackson.annotation.*;
import com.sun.istack.NotNull;
import lombok.*;
import org.testcontainers.shaded.org.glassfish.jersey.internal.util.collection.Views;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User implements Serializable {

    @Id
    @Column(name = "id_user")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "name")
    @NotNull
    private String name;
    @Column(name = "surname")
    @NotNull
    private String surname;
    @Column(name = "patronymic")
    @NotNull
    private String patronymic;
    @Column(name = "email")
    @NotNull
    private String email;
    @Column(name = "phone_number")
    @NotNull
    private String phoneNumber;
    @Column(name = "password")
    @NotNull
    private String password;
    @ManyToOne
    @JoinColumn(name = "id_role")
    private UserRole role;
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"user", "orderBooks"})
    @ToString.Exclude
    private Set<Order> orders = new HashSet<>();
    @Column(name = "status")
    private UserStatus status;
    @Column(name = "code")
    private String code;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name)
                && Objects.equals(surname, user.surname)
                && Objects.equals(patronymic, user.patronymic)
                && Objects.equals(email, user.email)
                && Objects.equals(phoneNumber, user.phoneNumber)
                && Objects.equals(password, user.password)
                && status == user.status && Objects.equals(code, user.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname,
                patronymic, email, phoneNumber,
                password, status, code);
    }
}
