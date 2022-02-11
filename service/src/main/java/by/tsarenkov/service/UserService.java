package by.tsarenkov.service;

import by.tsarenkov.common.model.dto.ActivationDto;
import by.tsarenkov.common.model.dto.SignUpDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.service.exception.ActivationAccountException;
import by.tsarenkov.service.exception.EmailAlreadyTakenException;

import java.util.List;

public interface UserService {
   User registerUser(SignUpDto userDto) throws EmailAlreadyTakenException;
   boolean checkUserByEmail(String email);
   void deleteUser(Long id);
   void updateUser(User user);
   List<User> getAllUsers();
   User getUserById(Long id);
   void updateUserStatus(Long id, UserStatus status);
   void activateAccount(ActivationDto activationDto) throws ActivationAccountException;
}
