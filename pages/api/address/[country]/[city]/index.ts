import {NextApiRequest, NextApiResponse} from "next";
import {QueryResult} from "pg";
const pool = require("../../../../../database/database");

const sql = "SELECT id_city, c.id_region, c.name\n" +
    "FROM city c\n" +
    "JOIN region r ON c.id_region = r.id_region\n" +
    "WHERE r.id_country = $1\n" +
    "AND UPPER(c.name) = UPPER($2)"

const getCityInCountryByName = (req: NextApiRequest, res: NextApiResponse) =>
{
    const country = req.query.country;
    const city = req.query.city;
    return new Promise<void>(resolve => {

        pool.query(sql, [country, city])
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

export default getCityInCountryByName