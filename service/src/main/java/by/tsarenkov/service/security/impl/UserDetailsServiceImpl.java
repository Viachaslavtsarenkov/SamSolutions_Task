package by.tsarenkov.service.security.impl;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.db.repository.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@NoArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private Set<SimpleGrantedAuthority> getAuthorities(User user)
          throws UsernameNotFoundException {
        Set<SimpleGrantedAuthority> authority = new HashSet<>();
        authority.add(new SimpleGrantedAuthority(user.getRole().toString()));
        return authority;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.getByEmail(email);
        System.out.println(user.getPassword());
        return new UserDetailsImpl(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user),
                user.getStatus()
        );
    }


}
