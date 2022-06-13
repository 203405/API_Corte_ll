import { Router } from "express";

import cors from "cors";

const router = Router();



export default router.get('/status',function(req,res) {
    let statusCode =  200;
    let statusMessage =  'ok';
    let error = false;

    res.json({
        error,
        statusCode,
        statusMessage,
    })
    
})
