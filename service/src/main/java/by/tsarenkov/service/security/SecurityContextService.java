package by.tsarenkov.service.security;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityContextService {
    private final UserRepository userRepository;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl authenticatedUser = (UserDetailsImpl) authentication.getPrincipal();
        String userEmail = authenticatedUser.getEmail();
        System.out.println(userEmail);
        return userRepository.getByEmail(userEmail);
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public String getEmail() {
        return getCurrentUser().getEmail();
    }

    public UserStatus getUserStatus() {
        return getCurrentUser().getStatus();
    }

    public String getUserName() {
        return String.format("%s %s %s ", getCurrentUser().getSurname(),
                getCurrentUser().getName(),
                getCurrentUser().getPatronymic());
    }

}
