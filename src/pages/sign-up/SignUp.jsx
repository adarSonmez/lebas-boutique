import React, { useState } from 'react';
import FormInput from '../../components/form-input/FormInput';
import CustomButton from '../../components/custom-button/CustomButton';
import { signUp, signInWithGoogle } from '../../firebase/auth';
import { createUserProfileDocument } from '../../firebase/firestore';
import './SignUp.scss';
import { Link } from 'react-router-dom';

function SignUp() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const { user } = await signUp(email, password);

      await createUserProfileDocument(user, {
        name: displayName,
      });

      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'display-name':
        setDisplayName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm-password':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">Sign up with your email and password</h2>
      <span>
        Already have an account?{' '}
        <Link to="/signin" className="orange-link">
          Sign In!
        </Link>
      </span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="display-name"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN UP</CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} google="true">
            {' '}
            sign In With Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
