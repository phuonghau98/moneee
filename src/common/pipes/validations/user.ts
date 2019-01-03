import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { CREATE_USER, CHANGE_PWD } from "../../../constants/resolverArguments";

@Injectable()
export class UserValidationPipe implements PipeTransform {
  private isPasswordValid (pwd) {
    const validPwdRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
    // 8-20 characters length
    return validPwdRegEx.test(pwd)
  }

  private isUsernameValid (usn) {
    const validUsnRegEx = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    // 8 - 20 characters length, begin with [a-zA-Z0-9], last character must be one of these [a-zA-Z0-9]
    return validUsnRegEx.test(usn)
  }

  private isNameValid (name) {
    const validNameRegEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    // First character must be an alphabet, can be followed by one of these character [',. -], and last character must be alphabet
    return validNameRegEx.test(name)
  }

  transform (value: any, metadata: ArgumentMetadata) {
    const user = value
    switch (metadata.data) {
      case CREATE_USER:
        if (this.isUsernameValid(user.usn) && this.isNameValid(user.name) && this.isPasswordValid(user.pwd)) return user
        throw new BadRequestException('Register info is invalid')
      case CHANGE_PWD:
        if (this.isPasswordValid(user.newPwd)) return user
        throw new BadRequestException('Password is not valid')
      default:
        return user
    }
  }
}