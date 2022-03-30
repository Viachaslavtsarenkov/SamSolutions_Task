package by.tsarenkov.service;

public interface MailService {
    void sendActivationMail(String email, String code);
    void sendMail(String email, String key);
}
