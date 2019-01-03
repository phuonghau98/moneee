import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { CREATE_RECORD } from "../../../constants/resolverArguments";

@Injectable()
export class RecordTransformerPipe implements PipeTransform {
  private getTime() {
    return new Date().toLocaleString()
  }

  private initRecord (user, ...propertyOptions) {
    let initializedRecord = user
    propertyOptions.forEach(opt => {
      initializedRecord = Object.assign(initializedRecord, opt)
    })
    return initializedRecord
  }

  private 
  async transform (value: any, metadata: ArgumentMetadata) {
    const record = value
    switch (metadata.data) {
      case CREATE_RECORD:
        return this.initRecord(record, { date: this.getTime() }, { description: [{ content: record.description, date: this.getTime() }] })            
      default:
        return record
    }
  }
}