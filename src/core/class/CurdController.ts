import db from '@core/db';
import {eq, like, sql} from 'drizzle-orm';
import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import express, { Request, Response, NextFunction } from 'express';
import Controller from "@core/class/Controller";
import validateRequest from "@core/utilites/validate";
import CheckPermission from '../express-decoraters/checkPermission';

class CrudController extends Controller{
    public table:MySqlTableWithColumns<any>;
    public model:any;
    public response:any;
    public createDto:any;
    public updateDto:any;

    constructor() {
        super();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

    }

    async index(req: Request, res: Response, next: NextFunction){
        const page:number = parseInt(req.query.page as string) || 1;
        const limit:number = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string;
        const items = await db.select().from(this.table)
                                .where(()=>{
                                    if(search){
                                        return like(this.table.name,`${search}%`)
                                    }
                                })
                                .limit(limit)
                                .offset((page-1)*limit);
        const totalItems = await db.select({   count:  sql<number>`count(*)` }).from(this.table).execute()
        let processedItems = items;
        if (typeof this.response !== 'undefined'){
            processedItems = this.response.list(items);
        }
        res.json({
                data: processedItems,
                meta:{
                    currentPage: page,
                    rowsPerPage: limit,
                    totalRows: totalItems[0].count,
                    totalPages: Math.ceil(totalItems[0].count/limit)
            }
        })
    }
    async create(req: Request, res: Response, next: NextFunction){
        if (!await validateRequest(this.createDto,req,res))  return ;
        let fillable = this.model.getFillable(req.body);
        //check if beforeCreate function exist in class
        try {
            await db.transaction(async (tx) => {
                if (typeof this.model.beforeCreate === 'function'){
                    fillable= await this.model.beforeCreate(fillable,tx);
                }
                const item = await tx.insert(this.table)
                                                        .values(fillable).execute();
                if (typeof this.model.afterCreate === 'function'){
                    await this.model.afterCreate(item[0],tx);
                }
                if (typeof this.model.onSave === 'function'){
                    await this.model.onSave(item[0],tx);
                }
                return res.json({
                    data:fillable
                });
            });
        } catch (e:any) {
            return res.status(500).json({
                message: 'Something went wrong',
                errors: [e.message]
            })
        }
    }

    async show(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const item = await db.select()
                .from(this.table)
                .where(eq(this.table.id,id))
            .execute();
        if (item.length <= 0){
            return res.status(404).json({
                message: 'Not found',
                errors: ['Item not found']
            })
        }
        let processedItem = item[0];
        if (typeof this.response !== 'undefined'){
            processedItem = this.response.detailResponse(item[0]);
        }
        return res.json({
            data: processedItem
        });
    }

    async update(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const item = await db.select()
            .from(this.table)
            .where(eq(this.table.id,id))
            .execute();
        if (item.length <= 0){
            return res.status(404).json({
                message: 'Not found',
                errors: ['Item not found']
            })
        }
        if (!await validateRequest(this.updateDto,req,res))  return ;
        let fillable = this.model.getFillable(req.body);
        //check if beforeUpdate function exist in class
        try {
            await db.transaction(async (tx) => {
                if (typeof this.model.beforeUpdate === 'function'){
                    fillable= await this.model.beforeUpdate(fillable,tx);
                }
                await tx.update(this.table).set(fillable).where(eq(this.table.id,id)).execute();
                if (typeof this.model.afterUpdate === 'function'){
                    await this.model.afterUpdate(item[0],tx);
                }
                if (typeof this.model.onSave === 'function'){
                    await this.model.onSave(item[0],tx);
                }
                return res.json({
                    data:fillable
                });
            });
        } catch (e:any) {
            return res.status(500).json({
                message: 'Something went wrong',
                errors: [e.message]
            })
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const item = await db.select()
            .from(this.table)
            .where(eq(this.table.id,id))
            .execute();
        if (item.length <= 0){
            return res.status(404).json({
                message: 'Not found',
                errors: ['Item not found']
            })
        }
        try {
            await db.transaction(async (tx) => {
                if (typeof this.model.beforeDelete === 'function'){
                    await this.model.beforeDelete(id,tx);
                }
                await tx.delete(this.table).where(eq(this.table.id,id)).execute();
                if (typeof this.model.afterDelete === 'function'){
                    await this.model.afterDelete(id,tx);
                }
                return res.json({
                    message: 'Item deleted successfully'
                });
            });
        } catch (e:any) {
            return res.status(500).json({
                message: 'Something went wrong',
                errors: [e.message]
            })
        }
    }

}
export default CrudController;