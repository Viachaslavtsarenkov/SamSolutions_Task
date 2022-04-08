package by.tsarenkov.service.impl;

import by.tsarenkov.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
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
    @Autowired
    private Environment environment;

    @Value("${activation.message}")
    private String activationMessage;

    @Override
    public boolean sendActivationMail(String email, String code) {
        preConfiguredMessage.setTo(email);
        preConfiguredMessage.setSubject("Activation");
        preConfiguredMessage.setText(String.format(activationMessage, email, code));
        mailSender.send(preConfiguredMessage);
        return true;
    }

    @Override
    public boolean sendMail(String email, String key) {
        preConfiguredMessage.setTo(email);
        preConfiguredMessage.setSubject("Activation");
        preConfiguredMessage.setText(String.format(activationMessage, email
                , environment.getRequiredProperty(key)));
        mailSender.send(preConfiguredMessage);
        return true;
    }


}
