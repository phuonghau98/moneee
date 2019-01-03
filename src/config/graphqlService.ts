import { Injectable } from "@nestjs/common"
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { join } from "path"

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions (): GqlModuleOptions {
    return {
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class'
      },
      context: ({ req }) => ({ req })
      
    }
  }
}