import {ChangeEvent, useState} from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";


interface Offer {
    id_offer: number,
    o_name: string,
    description: string,
    login: string,
    bio: string,
}

interface Room {
    id_offer: number,
    id_room: number,
    size: number,
    type: number,
    furniture: string[],
}

export default function Offer() {

    const [offer, setOffer] = useState<Offer>()

    const [rooms, setRooms] = useState<Room[]>([])

    const searchOffer = (id_offer: { id_offer: string }) => {
        const url = `http://localhost:3000/api/offer/${id_offer.id_offer}`
        console.log(url)
        fetch(url)
            .then((response) => {
                    response.json().then((data) => {
                        setOffer(data[0])
                        searchRooms(id_offer.id_offer);
                    })
                }
            ).catch((error) => console.log(error.message))
    }

    const searchRooms = (id_offer: string) => {
        const url = `http://localhost:3000/api/room/${id_offer}`
        console.log(url)
        fetch(url)
            .then((response) => {
                    response.json().then((data) => {
                        setRooms(data)
                    })
                }
            ).catch((error) => console.log(error.message))
    }

    return (
        <div>
            <Formik
                initialValues={{
                    id_offer: '',
                }}

                onSubmit={(
                    values: { id_offer: string },
                    {setSubmitting}: FormikHelpers<{ id_offer: string }>
                ) => {
                    setTimeout(() => {
                        searchOffer(values)
                        setSubmitting(false);
                    }, 500);
                }}

            >
                <Form>
                    <div>
                        <Field id="id_offer" name="id_offer" placeholder="id_offer"/>
                        Login
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>


                </Form>
            </Formik>

            {offer ? <div>
                <h3>Offer details</h3>
                <p>name - {offer.o_name}</p>
                <p>description {offer.description}</p>
                <h5>posted by</h5>
                <p>login - {offer.login}</p>
                <p>bio - {offer.bio}</p>
                <h2>rooms:</h2>
                    {rooms.map((room) => {
                        return (
                            <div>
                                <h4>{room.type}</h4>
                                <p>size - {room.size}</p>
                                <p>furniture: {room.furniture.map((furniture) => `${furniture}, `)}</p>
                            </div>)
                    })}
            </div> : <p> input offer id please</p>}
        </div>)
}

