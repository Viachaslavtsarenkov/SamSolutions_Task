package by.tsarenkov.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class EmailAlreadyTakenException extends Exception{

    public EmailAlreadyTakenException() {
        super();
    }

    public EmailAlreadyTakenException(String message) {
        super(message);
    }

    public EmailAlreadyTakenException(Throwable cause) {
        super(cause);
    }

    public EmailAlreadyTakenException(String message, Throwable cause) {
        super(message, cause);
    }
}
