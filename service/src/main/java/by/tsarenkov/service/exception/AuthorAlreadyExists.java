package by.tsarenkov.service.exception;

public class AuthorAlreadyExists extends Exception{
    public AuthorAlreadyExists() {
        super();
    }

    public AuthorAlreadyExists(String message) {
        super(message);
    }

    public AuthorAlreadyExists(Throwable cause) {
        super(cause);
    }

    public AuthorAlreadyExists(String message,Throwable cause) {
        super(message, cause);
    }
}
