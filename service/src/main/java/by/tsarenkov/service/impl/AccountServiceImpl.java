package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.db.repository.OrderRepository;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.AccountService;
import by.tsarenkov.service.exception.UserNotFoundException;
import by.tsarenkov.service.security.SecurityContextService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final SecurityContextService securityContextService;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional
    @Override
    public User getUserProfile() throws UserNotFoundException{
        Long id = securityContextService.getCurrentUserId();
        return Optional.of(userRepository.findById(id)).get()
                .orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    @Override
    public Order getUserOrder(Long idOrder) {
        Long id = securityContextService.getCurrentUserId();
        return orderRepository.findById(idOrder).get();
    }
}
