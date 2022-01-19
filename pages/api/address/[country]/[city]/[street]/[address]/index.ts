

import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";
const pool = require("../../../../../../../database/database");

const sql = "SELECT a.id_address, a.number\n" +
    "FROM address a\n" +
    "JOIN street s ON s.id_street = a.id_street\n" +
    "WHERE s.id_street = $1\n" +
    "AND a.number = $2"

const getStreet = (req: NextApiRequest, res: NextApiResponse) =>
{
    const street = req.query.street;
    const number = req.query.address;
    return new Promise<void>(resolve => {

        pool.query(sql, [street, number])
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