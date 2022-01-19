

import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";
const pool = require("../../../../../../database/database");

const sql = "SELECT id_street, a.id_area, s.name\n" +
    "FROM street s\n" +
    "JOIN area a ON s.id_area = a.id_area\n" +
    "WHERE a.id_city = $1\n" +
    "AND UPPER(s.name) LIKE UPPER($2);"

const getStreet = (req: NextApiRequest, res: NextApiResponse) =>
{
    const city = req.query.city;
    const street = req.query.street;
    return new Promise<void>(resolve => {

        pool.query(sql, [city, `%${street}%`])
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

export default getStreet