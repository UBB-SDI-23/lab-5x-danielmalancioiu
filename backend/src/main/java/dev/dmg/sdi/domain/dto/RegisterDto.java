package dev.dmg.sdi.domain.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterDto {

	String username;

	String jwtToken;

}