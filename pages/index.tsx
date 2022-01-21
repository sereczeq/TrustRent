import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {UserInterface} from "../types/user/user.interface";
import {useState} from "react";
import {data} from "browserslist";
import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType} from "next";
import {Field, Form, Formik, FormikHelpers} from "formik";


interface Credentials {
    username: string;
    password: string;
}

interface SearchData{
    name : string,
    minPrice : number,
    maxPrice : number,
    stars : number,
}

interface Offer
{
    id_offer : number,
    o_name : string,
    match : number,
    price : number,
    stars : number,
}

// interface Offer {
//     id_offer : number,
//     id_renter : number,
//     id_room : number,
//     o_name : string,
//     description : string,
//     score : number,
//
// }

export default function Home() {

    const [user, setUser] = useState<UserInterface | null>(null)

    // export const getServerSideProps: GetServerSideProps = async (context) => {
    const getUsers = async (credentials: Credentials) => {
        const res = await fetch(`http://localhost:3000/api/user/${credentials.username}/${credentials.password}`);
        const users: UserInterface[] = await res.json();
        if (users.length === 1) {
            return users[0]
        } else return null;
    }

    const [offers, setOffers] = useState<Offer[]>([])


    const getOffers = (searchData : SearchData) =>
    {
        let {name, minPrice, maxPrice, stars} = searchData;
        if(name === '') name = 'empty'
        if(!user) return;
        const url = `http://localhost:3000/api/offer/${name}/${user.id_user}/${minPrice}/${maxPrice}/${stars}/${orderer}/${order}`
        console.log(url)
        fetch(url)
        // fetch(`http://localhost:3000/api/offer/offers`)
            .then((response) => {
                response.json()
                    .then((data) => {
                        const o = data as Offer[]
                        setOffers(o)
                    })
            })
    }

    const [orderer, setOrderer] = useState('price');
    const [order, setOrder] = useState('ASC');


    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}

                onSubmit={(
                    values: Credentials,
                    {setSubmitting}: FormikHelpers<Credentials>
                ) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        getUsers(values).then((result) => {

                            setUser(result)

                        });
                        setSubmitting(false);
                    }, 500);
                }}

            >
                <Form>
                    <div>
                        <Field id="username" name="username" placeholder="Username"
                               aria-describedby="usernameHelp"/>
                        Login
                    </div>

                    <div>
                        <Field className="form-control" id="password" name="password" placeholder="Password"
                               type="password"/>
                        Password
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>


                </Form>
            </Formik>
            {!user ? <p>You need to log in</p> : <div>
                {/*----------------------------------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------------------------------*/}
                <Formik
                    initialValues={{
                        name: ' ',
                        minPrice: 0,
                        maxPrice: 100_000,
                        stars : 0,
                    }}

                    onSubmit={(
                        values: SearchData,
                        {setSubmitting}: FormikHelpers<SearchData>
                    ) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            console.log("Getting offers")
                            getOffers(values)
                            setSubmitting(false);
                        }, 500);
                    }}

                >
                    <Form>
                        <div>
                            <Field id="name" name="name" placeholder="Search"/>
                            Name
                        </div>

                        <div>
                            <Field id="minPrice" name="minPrice" placeholder="Min price" type="number"/>
                            Minimum price
                        </div>

                        <div>
                            <Field id="maxPrice" name="maxPrice" placeholder="Max price" type="number"/>
                            Maximum price
                        </div>

                        <div>
                            <Field id="stars" name="stars" placeholder="Min stars" type="number"/>
                            Minimum rating
                        </div>


                        <div>
                            Sort by
                            <input type="radio" value="price" name="orderer" checked={orderer === 'price'}
                                    onChange={(event) => setOrderer(event.target.value)}/> Price
                            <input type="radio" value="stars" name="orderer" checked={orderer === 'stars'}
                                   onChange={(event) => setOrderer(event.target.value)}/> Stars
                            <input type="radio" value="match" name="orderer" checked={orderer === 'match'}
                                   onChange={(event) => setOrderer(event.target.value)}/> Match
                            <input type="radio" value="ASC" name="order" checked={order === 'ASC'}
                                   onChange={(event) => setOrder(event.target.value)}/> ASC
                            <input type="radio" value="DESC" name="order" checked={order === 'DESC'}
                                   onChange={(event) => setOrder(event.target.value)}/> DESC
                        </div>


                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>

            </div>}
            <div>
                {offers.map(offer =>
                    <div>
                        <p>name - {offer.o_name}</p>
                        <p>price - {offer.price}</p>
                        <p>stars - {offer.stars}</p>
                        <p>match - {offer.match}</p>
                        <br/>
                    </div>)}
            </div>
        </div>

    )
}

