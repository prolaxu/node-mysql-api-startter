class Model{
    public  fillables:string[] = [];
    getFillable = (data:{})=>{
        let fillable = {};
        const dataKeys = Object.keys(data);
        dataKeys.forEach((key:string)=>{
            if(this.fillables.includes(key)){
                // @ts-ignore
                fillable[key]=data[key];
            }
        });
        return fillable;
    }

}
export  default  Model;