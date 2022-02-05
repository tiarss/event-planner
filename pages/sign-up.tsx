import react, { useState } from 'react';
import type { NextPage } from "next";
import { InputText } from '../components/Input/Input';
import { ButtonPrimary } from '../components/Button/Button';
import styles from "../styles/Sign-up.module.css";

const Signup: NextPage = () => {
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
                  <InputText label="Name" type="text" placeholder="Name" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Email" type="text" placeholder="Email" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Address" type="text" placeholder="Address" />
              </div>
            </div>
            <div className={styles.display}>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Occupation" type="text" placeholder="Occupation" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-control border-0">
                  <InputText label="Phone" type="text" placeholder="Phone" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control border-0">
                <InputText label="Password" type="password" placeholder="Password" />
              </div>
            </div>
            <div className='d-flex justify-content-end pt-2'>
              <ButtonPrimary title="Sign Up" />
            </div>
          </form>
          <p className='text-center'>
            Already have an account? <strong>Sign In Here</strong>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup;
