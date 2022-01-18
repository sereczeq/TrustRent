import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {UserInterface} from "../types/user/user.interface";
import {useState} from "react";
import {data} from "browserslist";
import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType} from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('http://localhost:3001/api/user');
    const users: UserInterface[] = await res.json();
    return {
        props: {
            users,
        }
    }
}

export default function Home({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <div>
            {users.map((user: UserInterface) =>
                <div>
                    <p>{user.login}</p>
                    <p>{user.email}</p>
                </div>
            )
            }
        </div>

    )
}
