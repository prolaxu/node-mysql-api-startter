import * as tables from '@/database/migrations';
const getTable = (tableName: string) => {
    try {
        // @ts-ignore
        return tables[tableName];
    } catch (error) {
        throw new Error(`Table ${tableName} not found`);
    }
}

export  {
    getTable
}