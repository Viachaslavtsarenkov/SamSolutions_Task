package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestAttribute;

@Service
public interface AccountService {
    User getUserProfile() throws UserNotFoundException;
    Order getUserOrder(Long idOrder);
}
