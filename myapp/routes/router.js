import express from 'express';
import fetch from 'node-fetch'
// import request from 'request';

const router  = express.Router();

router.get('/quotes', async (req, res) =>{
   const response = await fetch('https://opensheet.elk.sh/1NNaZeJXR-AaBeRoIrphPCTeAx1ltZ4ltH0yGV9_WIQ0/quotes')
   const data = await response.json();
   console.log(data);
})

export default router