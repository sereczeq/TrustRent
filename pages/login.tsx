// import {Formik, Field, Form, FormikHelpers} from 'formik';
// import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType} from "next";
// import {UserInterface} from "../types/user/user.interface";
// import {useEffect, useState} from "react";
// import {useRouter} from "next/router";
// import {parseCookies} from "../lib/parseCookies";
// import Cookie from "js-cookie";
//
// interface Credentials {
//     username: string;
//     password: string;
// }
//
//
// export default function LoginForm({initialUser : string} : GetInitialProps) {
//
//     const [user, setUser] = useState<UserInterface>(() =>
//         JSON.parse(initialUser)
//     );
//
//     useEffect(() => {
//         Cookie.set("initialUser", JSON.stringify(user));
//     }, [user]);
//
//     const router = useRouter();
//     console.log(user)
//
//
//     return (
//         <div>
//             {user ? <p>{user.login}</p> : <></>}
//             <h1>Login</h1>
//             <Formik
//                 initialValues={{
//                     username: '',
//                     password: '',
//                 }}
//
//                 onSubmit={(
//                     values: Credentials,
//                     {setSubmitting}: FormikHelpers<Credentials>
//                 ) => {
//                     setTimeout(() => {
//                         // alert(JSON.stringify(values, null, 2));
//                         getUsers(values).then((result) => {
//                             if(result)
//                             {
//                                 setUser(result)
//                             }
//
//                         });
//                         setSubmitting(false);
//                     }, 500);
//                 }}
//
//             >
//                 <Form>
//                     <div>
//                         <Field id="username" name="username" placeholder="Username"
//                                aria-describedby="usernameHelp"/>
//                     </div>
//
//                     <div>
//                         <Field className="form-control" id="password" name="password" placeholder="Password"
//                                type="password"/>
//                     </div>
//
//                     <button type="submit" className="btn btn-primary">Login</button>
//                 </Form>
//             </Formik>
//         </div>
//     )
//         ;
// };
//
// export const getStaticProps: GetStaticProps = async (context) => {
//     const cookies = parseCookies(context.params.)
//     return{
//         initialUser : cookies.initialUser
//     }
// }
//
//
// // export const getServerSideProps: GetServerSideProps = async (context) => {
// const getUsers = async (credentials: Credentials) => {
//     const res = await fetch(`http://localhost:3000/api/user/${credentials.username}/${credentials.password}`);
//     const users: UserInterface[] = await res.json();
//     if (users.length === 1)
//     {
//         return users[0]
//     }
//     else return null;
// }