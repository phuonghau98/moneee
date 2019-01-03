import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
export declare class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): GqlModuleOptions;
}
