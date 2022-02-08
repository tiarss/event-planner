import react, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { InputText } from "../components/Input/Input";
import { ButtonPrimary } from "../components/Button/Button";
import styles from "../styles/Sign-up.module.css";
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/Mutation";

const Signup: NextPage = () => {
  const [signUpAttempt, setSignUpAttempt] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    occupation: "",
    password: ""
  })
  const router = useRouter();

  const [newUser] = useMutation(ADD_USER);

  const handleSignUp = () => {
    newUser({
      variables: {
        name: signUpAttempt.name,
        email: signUpAttempt.email,
        address: signUpAttempt.address,
        phone: signUpAttempt.phone,
        occupation: signUpAttempt.occupation,
        password: signUpAttempt.password,
      },
      onCompleted: (data) => {
        router.push("/sign-in");
      },
      onError: (error: ApolloError) => {
        alert("Please ensure you have filled all information correctly");
      },
    });
  };

  return (
    <>
      <div className={styles.fullheight}>
        <div className={styles.logo_side}>LOGO</div>
        <div className={styles.signup_side}>
          <div className={styles.signup_container}>
            <h3 className='d-flex pt-3 px-2'>Sign Up</h3>
            <div className={styles.display}>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Name'
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setSignUpAttempt({ ...signUpAttempt, name: e.target.value})}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Email'
                    type='text'
                    placeholder='Email'
                    onChange={(e) => setSignUpAttempt({ ...signUpAttempt, email: e.target.value})}/>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control border-0'>
                <InputText
                  label='Address'
                  type='text'
                  placeholder='Address'
                  onChange={(e) => setSignUpAttempt({ ...signUpAttempt, address: e.target.value})}
                />
              </div>
            </div>
            <div className={styles.display}>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Occupation'
                    type='text'
                    placeholder='Occupation'
                    onChange={(e) => setSignUpAttempt({ ...signUpAttempt, occupation: e.target.value})}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Phone'
                    type='text'
                    placeholder='Phone'
                    onChange={(e) => setSignUpAttempt({ ...signUpAttempt, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control border-0'>
                <InputText
                  label='Password'
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setSignUpAttempt({ ...signUpAttempt, password: e.target.value})}
                />
              </div>
            </div>
            <div className='d-flex justify-content-end pt-2 px-2'>
              <ButtonPrimary title='Sign Up' onClick={() => handleSignUp()} />
            </div>
            <p className='text-center'>
              Already have an account? &nbsp;
              <Link href='/sign-in'>
                <a>
                  <strong>Sign In Here</strong>
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
