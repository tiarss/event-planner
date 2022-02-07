import react, { useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { InputText } from '../components/Input/Input';
import { ButtonPrimary } from '../components/Button/Button';
import styles from "../styles/Sign-up.module.css";
import { useLazyQuery } from '@apollo/client';
import { SIGNIN } from '../graphql/Query';

const Signin: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signIn, { loading, error, data }] = useLazyQuery(SIGNIN);
  if (loading) return (<p>Loading ...</p>);
  if (error) return `Error! ${error}`;

  if(data) {
    router.push("/");
    localStorage.setItem('id', data.login.id);
    localStorage.setItem('token', data.login.token);
  } 

  return (
    <>
      <div className={styles.fullheight}>
        <div className={styles.logo_side}>
          LOGO
        </div>
        <div className={styles.signup_side}>
          <div className={styles.signup_container}>
            <h3 className='d-flex pt-3 px-2'>Sign In</h3>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Email" type="text" placeholder="Email"
                  onChange={(e) => {setEmail(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Password" type="password" placeholder="Password"
                  onChange={(e) => {setPassword(e.target.value)}}
                />
              </div>
            </div>
          <div className='d-flex justify-content-end pt-2 px-2'>
            <ButtonPrimary title="Sign In" onClick={() => signIn({ variables: { email: email, password: password } })}
            />
          </div>
          <p className='text-center'>
            {"Don't have an account?"} &nbsp;
            <Link href="/sign-up">
              <a>
                <strong>Sign Up Here</strong>
              </a>
            </Link>
          </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin;
