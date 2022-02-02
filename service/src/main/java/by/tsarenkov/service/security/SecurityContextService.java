package by.tsarenkov.service.security;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityContextService {
    private final UserRepository userRepository;

    public User getCurrentUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail);
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

}
