package by.tsarenkov.service.impl;

import by.tsarenkov.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@PropertySource(value = "classpath:mail.properties", encoding = "UTF-8")
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SimpleMailMessage preConfiguredMessage;

    @Value("${activation.message}")
    private String activationMessage;

    @Override
    public void sendActivationMail(String email, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Activation");
        message.setText(String.format(activationMessage, email, code));
        mailSender.send(message);
    }

}
