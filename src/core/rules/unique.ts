import {registerDecorator, ValidationOptions, ValidationArguments, notEquals} from 'class-validator';
import {getTable} from "@core/utilites/db";
import db from "@core/db";
import {and, eq, not, sql} from "drizzle-orm";

export default function Unique(tableName: string,column:string, validationOptions?: ValidationOptions) {
    return  (object: Object, propertyName: string) =>{
        registerDecorator({
            name: 'Unique',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [tableName,column],
            options: validationOptions,
            validator: {
              async validate(value: any, args: ValidationArguments) {
                  // @ts-ignore
                  const id = args.object.id;
                  if (id){
                      const table = getTable(tableName);
                      console.log('id',id)
                      //count the number of rows with the same value and id
                      const { count } = (await db
                            .select( {   count:  sql<number>`count(*)` })
                            .from(table)
                            .where(and(eq(table[column],value),not(eq(table.id,id))))
                            .execute()
                      )[0];
                      return count <= 0;
                  }
                  const table = getTable(tableName);
                  const {count} =(await db
                      .select( {   count:  sql<number>`count(*)` })
                      .from(table)
                      .where(eq(table[column],value))
                      .execute())[0];
                  return count <= 0;
                },
            },
        });
    };
}