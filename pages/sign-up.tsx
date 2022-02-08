import react, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { InputText } from "../components/Input/Input";
import { ButtonPrimary } from "../components/Button/Button";
import styles from "../styles/Sign-up.module.css";
import { ApolloError, useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/Mutation";
import { useToast } from "@chakra-ui/react";

const Signup: NextPage = () => {
  const toast = useToast();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const [newUser] = useMutation(ADD_USER);

  const handleSignUp = () => {
    newUser({
      variables: {
        name: name,
        email: email,
        address: address,
        phone: phone,
        occupation: occupation,
        password: password,
      },
      onCompleted: (data) => {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/sign-in");
      },
      onError: (error: ApolloError) => {
        if(error.message == "email is already exist")
        toast({
          title: "Email is Already Exist",
          description: "Failed to Create Account",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <>
      <div className={styles.fullheight}>
        <div className={styles.logo_side}>LOGO</div>
        <div className={styles.signup_side}>
          <div className={styles.signup_container}>
            <h3 className={styles.signup_text}>Sign Up</h3>
            <div className={styles.display}>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Name'
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Email'
                    type='text'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <div className='form-control border-0'>
                <InputText
                  label='Address'
                  type='text'
                  placeholder='Address'
                  onChange={(e) => setAddress(e.target.value)}
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
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='form-control border-0'>
                  <InputText
                    label='Phone'
                    type='text'
                    placeholder='Phone'
                    onChange={(e) => setPhone(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
