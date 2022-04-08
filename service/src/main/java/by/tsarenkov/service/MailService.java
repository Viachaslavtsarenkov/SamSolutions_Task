package by.tsarenkov.service;

public interface MailService {
    boolean sendActivationMail(String email, String code);
    boolean sendMail(String email, String key);
}
