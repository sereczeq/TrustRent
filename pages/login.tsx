import {Formik, Field, Form, FormikHelpers} from 'formik';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {UserInterface} from "../types/user/user.interface";
import {useState} from "react";

interface Credentials {
    username: string;
    password: string;
}


// export const getServerSideProps: GetServerSideProps = async (context) => {
export async function getUsers(credentials: Credentials) {
    const res = await fetch(`http://localhost:3001/api/user/${credentials.username}/${credentials.password}`);
    const users: UserInterface[] = await res.json();
    return users;
}

export default function LoginForm() {
    const [users, setUsers] = useState<UserInterface[]>([]);
    return (
        <div>
            {users.length === 0 ?
            <div>
                <h1>Login</h1>
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
                            getUsers(values).then((response) => setUsers(response));
                            setSubmitting(false);
                        }, 500);
                    }}

                >
                    <Form>
                        <div>
                            <Field id="username" name="username" placeholder="Username"
                                   aria-describedby="usernameHelp"/>
                        </div>

                        <div>
                            <Field className="form-control" id="password" name="password" placeholder="Password"
                                   type="password"/>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </Form>
                </Formik>
            </div> :
                <div> {users[0].login}</div> }
        </div>
    );
};