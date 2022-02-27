package by.tsarenkov.service.validator;

import by.tsarenkov.common.model.dto.SignUpDto;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.constants.MessageResponse;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@PropertySource("classpath:validation.properties")
public class UserDataValidator implements Validator {

    private static final String EMAIL_PATTERN = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
    private static final String PHONE_NUMBER_PATTERN = "^(\\+375)((29)|(33)|(44))\\d{7}$";

    private static final String NAME = "name";
    private static final String SURNAME = "surname";
    private static final String EMAIL = "email";
    private static final String PASSWORD = "password";
    private static final String PHONE_NUMBER = "phoneNumber";
    private static final String FILED_SIZE_ERROR = "text.size";
    private static final String PASSWORD_SIZE_ERROR = "text.short";
    private static final String REQUIRED_FIELD_ERROR = "empty";

    private static final Pattern validEmailRegex;
    private static final Pattern validPhoneNumber;

    static {
        validEmailRegex = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);
        validPhoneNumber = Pattern.compile(PHONE_NUMBER_PATTERN);
    }

    public UserDataValidator() {
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SignUpDto user = (SignUpDto) target;
        validateName(user.getName(), errors);
        validateSurname(user.getSurname(), errors);
        validatePassword(user.getPassword(), user.getMatchingPassword(), errors);
        validatePhoneNumber(user.getPhoneNumber(), errors);
        validateEmail(user.getEmail(), errors);
    }

    private void validateName(String name , Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, NAME, REQUIRED_FIELD_ERROR);
        if(name.length() < 2 || name.length() > 35) {
            errors.rejectValue(NAME, FILED_SIZE_ERROR);
        }
    }

    private void validateSurname(String surname , Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, SURNAME, REQUIRED_FIELD_ERROR);
        if(surname.length() < 2 || surname.length() > 35) {
            errors.rejectValue(SURNAME, FILED_SIZE_ERROR);
        }
    }

    private void validateEmail(String email , Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, SURNAME, REQUIRED_FIELD_ERROR);
        Matcher emailMatcher = validEmailRegex.matcher(email);
        if (!emailMatcher.matches()) {
            errors.rejectValue(EMAIL, MessageResponse.EMAIL_ERROR);
        }
    }

    private void validatePhoneNumber(String phoneNumber, Errors errors) {
        Matcher phoneNumberMatcher = validPhoneNumber.matcher(phoneNumber);
        if (!phoneNumberMatcher.matches()) {
            errors.rejectValue(PHONE_NUMBER,MessageResponse.PHONE_NUMBER_ERROR);
        }
    }

    private void validatePassword(String password, String matchingPassword , Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, SURNAME, REQUIRED_FIELD_ERROR);
        if(password.length() < 8) {
            errors.rejectValue(PASSWORD, MessageResponse.SHORT_TEXT_ERROR);
        } else if(!password.equals(matchingPassword)) {
            errors.rejectValue(PASSWORD, MessageResponse.PASSWORD_EQUALS_ERROR);
        }
    }
}
