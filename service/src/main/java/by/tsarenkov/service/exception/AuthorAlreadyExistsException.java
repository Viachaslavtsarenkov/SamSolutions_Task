package by.tsarenkov.service.exception;

public class AuthorAlreadyExistsException extends Exception{
    public AuthorAlreadyExistsException() {
        super();
    }

    public AuthorAlreadyExistsException(String message) {
        super(message);
    }

    public AuthorAlreadyExistsException(Throwable cause) {
        super(cause);
    }

    public AuthorAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
