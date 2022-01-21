import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";

const pool = require('../../../../../../../../../../database/database')

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
    'WHERE u.id_user = $1\n' +
    '  AND ph.price BETWEEN $2 AND $3\n' +
    '  AND UPPER(o.o_name) LIKE UPPER($4)\n' +
    '  AND r.stars > $5\n' +
    'GROUP BY r.stars, ph.price, o.o_name, o.id_offer\n';

const price = (order: string) => `ORDER BY price ${order}, match DESC, stars DESC;`
const match = (order: string) => `ORDER BY match ${order}, price DESC, stars DESC;`
const stars = (order: string) => `ORDER BY stars ${order}, match DESC, price DESC;`


export default async function getAllOffers(req: NextApiRequest, res: NextApiResponse) {
    return new Promise<void>(resolve => {
        const name = req.query.name;
        const userId = req.query.id_user;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const minStars = req.query.stars;
        const orderer = req.query.orderer;
        const order = req.query.order as string;

        let addon = '';
        switch (orderer) {
            case 'price':
                addon = price(order);
                break;
            case 'match':
                addon = match(order);
                break;
            default:
                addon = stars(order);
        }

        pool.query(sql + addon, [userId, minPrice, maxPrice, `%${name}%`, minStars])
            .then((queryResult: QueryResult) => {
                res.json(queryResult.rows)
                res.end()
                resolve()
            })
            .catch((err: Error) => {
                console.log(err.message)
            })
    })

}