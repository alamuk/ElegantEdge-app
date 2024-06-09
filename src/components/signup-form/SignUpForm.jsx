import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';
import Button from '../button/Button';
import FormInput from '../form-input/FormInput';
import './SingUpForm.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm password matches
    if (password !== confirmPassword) {
      alert('your passwords do not match');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('cannot create user email already in use');
      } else {
        alert(`user creation error ${e}`);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          required
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          value={email}
          type="email"
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name="password"
          value={password}
          type="password"
          required
          onChange={handleChange}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          required
          onChange={handleChange}
        />

        <Button type="Submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
