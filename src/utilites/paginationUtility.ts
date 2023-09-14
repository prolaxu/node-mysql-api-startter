import db from "@/core/db";
import { sql } from "drizzle-orm";
import { MySqlTableWithColumns } from "drizzle-orm/mysql-core"
import { Request } from "express"

interface PaginationMeta{
    req:Request
    builder?:any,
}
const paginate= async ({
    builder,
    req
}:PaginationMeta) =>{
    const page:number = parseInt(req.query.page as string) || 1;
    const limit:number = parseInt(req.query.limit as string) || 10;
    const items = await builder.limit(limit).offset((page-1)*limit).execute()
    // const totalItems = await db.select({   count:  sql<number>`count(*)` }).from(table).execute()  
    return {
        data: items,
        meta:{
            currentPage: page,
            rowsPerPage: limit,
            // totalRows: totalItems[0].count,
            // totalPages: Math.ceil(totalItems[0].count/limit)
        }
    }
}

export default paginate;