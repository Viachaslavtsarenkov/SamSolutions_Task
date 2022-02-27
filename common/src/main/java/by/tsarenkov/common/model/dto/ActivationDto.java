package by.tsarenkov.common.model.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ActivationDto {
    private String email;
    private String code;
}
