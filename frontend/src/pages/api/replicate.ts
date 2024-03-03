import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: any, res: any) {

  const { method } = req;
  let cursor:string = req.query.cursor;
  

  if ( cursor  == '') {
    
    try {
      const response = await axios.get('https://api.replicate.com/v1/models', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": '**',
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        },
      })
      res.status(200).json({ modules: response.data })
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  else {
    try {
      const response = await axios.get(`${ cursor }`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": '**',
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
        },
      })
      return res.status(200).json({ modules: response.data })
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } 
}


