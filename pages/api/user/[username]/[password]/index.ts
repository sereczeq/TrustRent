import {QueryResult} from "pg";
import {NextApiRequest, NextApiResponse} from "next";

const pool = require('../../../../../database/database')

const getAllUsersSQL = 'SELECT * FROM "User" WHERE login = $1 AND password = $2';

export default async function getAllUsers(req: NextApiRequest, res: NextApiResponse)
{
    return new Promise<void>(resolve => {
        const username = req.query.username;
        const password = req.query.password;
        console.log(username, password)
        console.log("getting data from database")
        pool.query(getAllUsersSQL, [username, password])
            .then((queryResult : QueryResult) => {
                res.json(queryResult.rows)
                res.end()
                resolve()
            })
            .catch((err : Error) => {
                console.log(err.message)
            })
    })

}