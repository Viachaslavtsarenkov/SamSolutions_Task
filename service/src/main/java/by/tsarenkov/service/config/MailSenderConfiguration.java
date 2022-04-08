package by.tsarenkov.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@PropertySource(value = "classpath:spring.mail.properties", encoding = "UTF-8")
public class MailSenderConfiguration {

    private static final String MAIL_TRANSPORT_PROTOCOL = "mail.transport.protocol";
    private static final String MAIL_SMTP_AUTH = "mail.smtp.auth";
    private static final String MAIL_SMTP_STARTTLS= "mail.smtp.starttls.enable";
    private static final String MAIL_DEBUG = "mail.debug";
    private static final String USERNAME = "mail.username";
    private static final String PASSWORD = "mail.password";
    private static final String HOST = "mail.host";
    private static final String PORT = "mail.port";

    @Autowired
    private Environment env;

    @Bean
    public JavaMailSender getJavaMailSender()
    {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(env.getRequiredProperty(HOST));
        mailSender.setPort(Integer.parseInt(env.getRequiredProperty(PORT)));
        mailSender.setUsername(env.getRequiredProperty(USERNAME));
        mailSender.setPassword(env.getRequiredProperty(PASSWORD));
        Properties props = mailSender.getJavaMailProperties();
        props.put(MAIL_TRANSPORT_PROTOCOL, env.getRequiredProperty(MAIL_TRANSPORT_PROTOCOL));
        props.put(MAIL_SMTP_AUTH, env.getRequiredProperty(MAIL_SMTP_AUTH));
        props.put(MAIL_SMTP_STARTTLS, env.getRequiredProperty(MAIL_SMTP_STARTTLS));
        props.put(MAIL_DEBUG, env.getRequiredProperty(MAIL_DEBUG));

        return mailSender;
    }

    @Bean
    public SimpleMailMessage emailTemplate()
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(env.getRequiredProperty(USERNAME));
        message.setText("FATAL - Application crash. Save your job !!");
        return message;
    }


}
