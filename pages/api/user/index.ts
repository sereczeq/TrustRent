import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";
import {UserInterface} from "../../../types/user/user.interface";

const pool = require('../../../database/database')

const getAllUsersSQL = 'SELECT * FROM "User"'

export default async function getAllUsers(req: NextApiRequest, res: NextApiResponse)
{
    return new Promise<void>(resolve => {
        console.log("getting data from database")
        pool.query(getAllUsersSQL)
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