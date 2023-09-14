import Response from "@core/class/Response";

class UserResponse extends Response{
    listResponse=(item:any)=>{
        return {
            id:item.id,
            name:item.name,
            email:item.email
        }
    };
    detailResponse=(item:any)=>{
        return {
            id:item.id,
            name:item.name,
            email:item.email,
            created_at:item.created_at,
            updated_at:item.updated_at,
        }
    }
}

export default UserResponse;