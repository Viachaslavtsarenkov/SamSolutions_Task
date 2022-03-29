package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.testcontainers.shaded.org.glassfish.jersey.internal.util.collection.Views;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User implements Serializable {

    @Id
    @Column(name = "id_user")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "patronymic")
    private String patronymic;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "password")
    private String password;
    @ManyToOne
    @JoinColumn(name = "id_role")
    private UserRole role;
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"user", "orderBooks"})
    @ToString.Exclude
    private Set<Order> orders = new HashSet<>();
    @Column(name = "status")
    private UserStatus status;
    @Column(name = "code")
    private String code;
}
