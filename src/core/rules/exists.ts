import {registerDecorator, ValidationOptions, ValidationArguments, notEquals} from 'class-validator';
import {getTable} from "@core/utilites/db";
import db from "@core/db";
import {eq} from "drizzle-orm";

export default function Exist(tableName: string,column:string, validationOptions?: ValidationOptions) {
    return  (object: Object, propertyName: string) =>{
        registerDecorator({
            name: 'Exist',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [tableName,column],
            options: validationOptions,
            validator: {
              async validate(value: any, args: ValidationArguments) {
                  const table = getTable(tableName);
                  const result = await db
                      .select()
                      .from(table)
                      .where(eq(table[column],value))
                      .execute();
                  return result.length > 0;
                },
            },
        });
    };
}