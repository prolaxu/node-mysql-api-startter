class  Response{
    response=(item:any)=>{
        return item;
    }
    listResponse=(item:any)=>this.response(item);

    list=(items:any)=>{
        return {
            data: items.map((item:any) => this.listResponse(item)),
        }
    }
    detail=(item:any)=> {
        return {
            data: this.response(item),
        }
    }
}

export default Response;