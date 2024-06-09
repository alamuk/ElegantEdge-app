import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button';
import FormInput from '../form-input/FormInput';
import './SingInForm.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (e) {
      switch (e.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(e);
          break;
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
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="Submit">
            Sign In
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
