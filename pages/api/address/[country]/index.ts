import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";
const pool = require("../../../../database/database");

const getCountryByName = (req: NextApiRequest, res: NextApiResponse) =>
{
    const sql = 'SELECT * FROM country WHERE UPPER(name) LIKE UPPER($1);'

    const country = req.query.country;
    return new Promise<void>(resolve => {

        pool.query(sql, [`%${country}%`])
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

export default getCountryByName