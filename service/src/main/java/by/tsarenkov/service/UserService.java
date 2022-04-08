package by.tsarenkov.service;

import by.tsarenkov.common.model.dto.ActivationDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.common.model.payload.UserPageResponse;
import by.tsarenkov.service.exception.ActivationAccountException;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;
import by.tsarenkov.service.exception.UserNotFoundException;

import java.util.List;

public interface UserService {
   User registerUser(User user) throws EmailAlreadyTakenException;
   boolean checkUserByEmail(String email);
   void deleteUser(Long id);
   void updateUser(User user);
   UserPageResponse findAllUsers(int page, int size);
   User getUserById(Long id) throws UserNotFoundException;
   void updateUserStatus(Long id, UserStatus status);
   void activateAccount(ActivationDto activationDto) throws ActivationAccountException;
}
