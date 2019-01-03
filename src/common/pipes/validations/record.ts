import { Injectable, PipeTransform, ArgumentMetadata, NotAcceptableException } from "@nestjs/common"
import { MODIFY_RECORD_DESCRIPTION } from "../../../constants/resolverArguments"

@Injectable()
export class RecordValidationPipe implements PipeTransform {

  transform (value: any, metadata: ArgumentMetadata) {
    const record = value
    switch (metadata.data) {
      case MODIFY_RECORD_DESCRIPTION:
        const { content, curUserId, recordId } = value
        if (content.length === 0) throw new NotAcceptableException('There is nothing to update')
        break
      default:
        return record
    }
  }
}