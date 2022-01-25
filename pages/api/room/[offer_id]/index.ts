import {NextApiRequest, NextApiResponse} from "next";
const pool = require("../../../../database/database");
import {QueryResult} from "pg";

const sql = 'SELECT o.id_offer, r.id_room, r.size, rt.type, array_agg(fu.type) as furniture\n' +
    'FROM offer o\n' +
    'LEFT JOIN room rx ON o.id_room = rx.id_room\n' +
    'LEFT JOIN flat f ON rx.id_flat = f.id_flat\n' +
    'LEFT JOIN room r ON f.id_flat = r.id_flat\n' +
    'JOIN room_type rt ON r.id_room_type = rt.id_room_type\n' +
    'JOIN room_furniture rf ON r.id_room = rf.id_room\n' +
    'JOIN furniture fu ON rf.id_furniture = fu.id_furniture\n' +
    'WHERE o.id_offer = $1\n' +
    'GROUP BY o.id_offer, r.id_room, o.id_offer, r.size, rt.type'

export default async function getOneOffer(req: NextApiRequest, res: NextApiResponse)
{
    return new Promise<void>(resolve => {
        const id = req.query.offer_id;
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