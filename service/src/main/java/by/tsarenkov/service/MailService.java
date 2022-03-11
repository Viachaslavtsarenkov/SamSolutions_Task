package by.tsarenkov.service;

public interface MailService {
    void sendActivationMail(String email, String code);
}
