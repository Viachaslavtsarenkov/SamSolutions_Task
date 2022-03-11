package by.tsarenkov.common.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private String surname;
    private String name;
    private String patronymic;
    private String phoneNumber;
    private String email;
    private String password;
    private String matchingPassword;
}
