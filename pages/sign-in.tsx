import react, { useState } from 'react';
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { InputText } from '../components/Input/Input';
import { ButtonPrimary } from '../components/Button/Button';
import styles from "../styles/Sign-up.module.css";
import { useQuery } from '@apollo/client';
import { SIGNIN } from '../graphql/Query';

const Signup: NextPage = () => {
  const router = useRouter();
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    occupation: "",
    password: ""
  })
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {loading, error, data} = useQuery(SIGNIN, {
    variables: {
      email: email,
      password: password
    }
  });
  // console.log(data);

  const handleSignIn = () => {
    if(data) {
      router.push("/");
    }
  };
  
  return (
    <>
      <div className={styles.fullheight}>
        <div className={styles.logo_side}>
          LOGO
        </div>
        <div className={styles.signup_side}>
          <h3 className='d-flex pt-3'>Sign In</h3>
          <form>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Email" type="text" placeholder="Email"
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Password" type="password" placeholder="Password"
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className='d-flex justify-content-end pt-2'>
              <ButtonPrimary title="Sign In" onClick={() => handleSignIn()}/>
            </div>
          </form>
          <p className='text-center'>
            Don't have an account? &nbsp;
            <Link href="/sign-up">
              <a>
                <strong>Sign Up Here</strong>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup;
