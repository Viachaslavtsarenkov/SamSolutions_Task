package by.tsarenkov.common.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String surname;
    private String name;
    private String patronymic;
    private String phoneNumber;
    private String email;
    private String password;
    private String matchingPassword;
}
