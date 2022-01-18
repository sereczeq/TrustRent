import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";

const pool = require('../../../database/database')

const getAllUsersSQL = 'SELECT * FROM "User"'

export default async function getAllUsers(req: NextApiRequest, res: NextApiResponse)
{
    pool.query(getAllUsersSQL)
        .then((queryResult : QueryResult) => {
            res.json(queryResult.rows)
        })
        .catch((err : Error) => {
            console.log(err.message)
        })
}