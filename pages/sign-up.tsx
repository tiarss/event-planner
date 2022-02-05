import react, { useState } from 'react';
import type { NextPage } from "next";
import Link from 'next/link';
import { InputText } from '../components/Input/Input';
import { ButtonPrimary } from '../components/Button/Button';
import styles from "../styles/Sign-up.module.css";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/Mutation';

const Signup: NextPage = () => {
  // const [signUpInfo, setSignUpInfo] = useState({
  //   name: "",
  //   email: "",
  //   address: "",
  //   phone: "",
  //   occupation: "",
  //   password: ""
  // })
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [newUser] = useMutation(ADD_USER);
  console.log(newUser);

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
        console.log(data);
      },
    });
  };
  
  return (
    <>
      <div className={styles.fullheight}>
        <div className={styles.logo_side}>
          LOGO
        </div>
        <div className={styles.signup_side}>
          <h3 className='d-flex pt-3'>Sign Up</h3>
          <form>
            <div className={styles.display}>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Name" type="text" placeholder="Name"
                    onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Email" type="text" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Address" type="text" placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}/>
              </div>
            </div>
            <div className={styles.display}>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Occupation" type="text" placeholder="Occupation"
                    onChange={(e) => setOccupation(e.target.value)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Phone" type="text" placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Password" type="password" placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className='d-flex justify-content-end pt-2'>
              <ButtonPrimary title="Sign Up" onClick={() => handleSignUp()}/>
              {/* <button onClick={handleSignUp(signUpInfo)}>Sign Up</button> */}
            </div>
          </form>
          <p className='text-center'>
            Already have an account? &nbsp;
            <Link href="/sign-in">
              <a>
                <strong>Sign In Here</strong>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup;
