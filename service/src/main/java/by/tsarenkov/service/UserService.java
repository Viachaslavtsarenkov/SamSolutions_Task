package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.exception.MailAlreadyInUse;

public interface UserService {
   User registerUser(User user) throws MailAlreadyInUse;
   boolean checkUserByEmail(String email);
   void deleteUser(Long id);
   void updateUser(User user);
   void getAllUsers();
}
