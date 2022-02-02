package by.tsarenkov.common.model;

import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;


@AllArgsConstructor
@Getter
public class UserDetailsImpl implements UserDetails {

    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private char[] password;
    private Set<SimpleGrantedAuthority> authorities;
    private UserStatus status;

    @Override
    public Collection<? extends SimpleGrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return String.format("%s %s %s", name, surname, patronymic);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return status == UserStatus.ACTIVE;
    }

    @Override
    public boolean isAccountNonLocked() {
        return status == UserStatus.ACTIVE;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return status == UserStatus.ACTIVE;
    }

    @Override
    public boolean isEnabled() {
        return status == UserStatus.ACTIVE;
    }
}
