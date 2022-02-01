package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.UserStatus;

import java.util.List;

public interface UserService {
   User registerUser(User user);
   boolean checkUserByEmail(String email);
   void deleteUser(Long id);
   void updateUser(User user);
   List<User> getAllUsers();
   User getUserById(Long id);
   void updateUserStatus(Long id, UserStatus status);
}
