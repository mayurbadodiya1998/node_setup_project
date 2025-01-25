class Response{
    constructor(){}
    success(message,data,metadata){
        let obj={
            message,
            status:"success",
            data:data||{}
        }
        if(metadata){
            obj['meta']=metadata;
        }
        return obj
    }
   
    failure(message,error_code,error){
        return {
            status: "error",
            message: message,
            data: null,
            error: {
              code: error_code,
              details:error
            }
          }
    }
}
export default new Response();