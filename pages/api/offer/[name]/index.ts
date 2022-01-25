import {NextApiRequest, NextApiResponse} from "next";
const pool = require("../../../../database/database");
import {QueryResult} from "pg";

const sql = 'SELECT o.id_offer, o.o_name, o.description, u.login, u.bio\n' +
    'FROM offer o\n' +
    'LEFT JOIN "User" u ON u.id_user = o.id_renter\n' +
    'WHERE o.id_offer = $1;'

export default async function getOneOffer(req: NextApiRequest, res: NextApiResponse)
{
    return new Promise<void>(resolve => {
        const id = req.query.name;
        // actually offer id not name
        pool.query(sql, [id])
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