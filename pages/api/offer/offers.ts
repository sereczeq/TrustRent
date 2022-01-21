import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";

const pool = require('../../../database/database')

const sql = 'SELECT o.id_offer,\n' +
    '       o.o_name,\n' +
    '       SUM(ut.percentage * ot.percentage) AS match,\n' +
    '       ph.price,\n' +
    '       r.stars\n' +
    'FROM type t\n' +
    '         LEFT JOIN user_type ut ON t.id_type = ut.id_type\n' +
    '         LEFT JOIN offer_type ot ON t.id_type = ot.id_type\n' +
    '         JOIN offer o ON ot.id_offer = o.id_offer\n' +
    '         JOIN "User" u ON ut.id_user = u.id_user\n' +
    '         JOIN (\n' +
    '    SELECT DISTINCT ON (id_offer) date, ph.price, id_offer\n' +
    '    FROM price_history ph\n' +
    '    ORDER BY id_offer, date DESC\n' +
    ') AS ph ON o.id_offer = ph.id_offer\n' +
    '         JOIN (\n' +
    '    SELECT CAST(CAST(SUM(review.stars) AS FLOAT) / COUNT(review.stars) AS NUMERIC(36, 2)) AS stars,\n' +
    '           r.id_room                                                                      AS id_room\n' +
    '    FROM review\n' +
    '             JOIN room r ON review.id_room = r.id_room\n' +
    '    GROUP BY r.id_room\n' +
    ') AS r ON o.id_room = r.id_room\n' +
    'WHERE u.id_user = 1\n' +
    '  AND ph.price BETWEEN 0 AND 5000\n' +
    'GROUP BY r.stars, ph.price, o.o_name, o.id_offer\n' +
    'ORDER BY price ASC, match DESC, stars DESC;'

const sql2 = 'SELECT o.id_offer,       o.o_name,       SUM(ut.percentage * ot.percentage) AS match,       ph.price,       r.stars FROM type t         LEFT JOIN user_type ut ON t.id_type = ut.id_type         LEFT JOIN offer_type ot ON t.id_type = ot.id_type         JOIN offer o ON ot.id_offer = o.id_offer         JOIN "User" u ON ut.id_user = u.id_user         JOIN (    SELECT DISTINCT ON (id_offer) date, ph.price, id_offer    FROM price_history ph    ORDER BY id_offer, date DESC) AS ph ON o.id_offer = ph.id_offer JOIN (SELECT CAST(CAST(SUM(review.stars) AS FLOAT) / COUNT(review.stars) AS NUMERIC(36, 2)) AS stars, r.id_room                                                                      AS id_room FROM review             JOIN room r ON review.id_room = r.id_room     GROUP BY r.id_room ) AS r ON o.id_room = r.id_room WHERE u.id_user = 1   AND ph.price BETWEEN 0 AND 100000 GROUP BY r.stars, ph.price, o.o_name, o.id_offer ORDER BY price ASC, match DESC, stars DESC;'

export default async function getAllOffers(req: NextApiRequest, res: NextApiResponse)
{
    return new Promise<void>(resolve => {
        // const name = req.query.name;
        // const userId = req.query.id_user;
        // const minPrice = req.query.minPrice;
        // const maxPrice = req.query.maxPrice;
        // const stars = req.query.stars;
        pool.query(sql)
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