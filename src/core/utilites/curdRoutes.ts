import {Router} from 'express';

const actions:string[] = ['index', 'create', 'show', 'update', 'delete'];
const curdRoute=(controller:any,only:string[]=actions)=>{
    const router = Router();
    if (only.includes('index')){
        router.get('/', controller.index)
    }
    if (only.includes('create')){
        router.post('/', controller.create)
    }
    if (only.includes('show')){
        router.get('/:id', controller.show)
    }
    if (only.includes('update')){
        router.put('/:id', controller.update)
    }
    if (only.includes('delete')){
        router.delete('/:id', controller.delete)
    }
    return router;
}
export default curdRoute;