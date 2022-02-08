import react, { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { InputText } from "../components/Input/Input";
import { ButtonPrimary } from "../components/Button/Button";
import styles from "../styles/sign-in.module.css";
import { useLazyQuery } from "@apollo/client";
import { SIGNIN } from "../graphql/Query";
import { useToast } from "@chakra-ui/react";

const Signin: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signIn, { loading, error, data }] = useLazyQuery(SIGNIN);

  if (data) {
    toast({
      title: "Sign In Success",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    router.push("/");
    localStorage.setItem("id", data.login.id);
    localStorage.setItem("token", data.login.token);
  }

  if (loading) {
    return <p></p>;
  } else if (error) {
    return (
      <>
        <div className={styles.fullheight}>
          <div className={styles.logo_side}><p>eventGO</p></div>
          <div className={styles.signup_side}>
            <div className={styles.signup_container}>
              <p className={styles.signup_text}>Sign In</p>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Email'
                    type='text'
                    placeholder='Email'
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Password'
                    type='password'
                    placeholder='Password'
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='d-flex justify-content-end pt-2 px-2'>
                <ButtonPrimary
                  title='Sign In'
                  onClick={() =>
                    signIn({ variables: { email: email, password: password } })
                  }
                />
              </div>
              <p className='text-center'>
                {"Don't have an account?"} &nbsp;
                <Link href='/sign-up'>
                  <a>
                    <strong>Sign Up Here</strong>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.fullheight}>
          <div className={styles.logo_side}>
            <p>eventGO</p>
          </div>
          <div className={styles.signup_side}>
            <div className={styles.signup_container}>
              <p className={styles.signup_text}>Sign In</p>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Email'
                    type='text'
                    placeholder='Email'
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Password'
                    type='password'
                    placeholder='Password'
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='d-flex justify-content-end pt-2 px-2'>
                <ButtonPrimary
                  title='Sign In'
                  onClick={() =>
                    signIn({ variables: { email: email, password: password } })
                  }
                />
              </div>
              <p className='text-center'>
                {"Don't have an account?"} &nbsp;
                <Link href='/sign-up'>
                  <a>
                    <strong>Sign Up Here</strong>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Signin;
