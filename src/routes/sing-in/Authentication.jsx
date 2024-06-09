import SignInForm from '../../components/sign-in-form/SignInForm';
import SignUpForm from '../../components/signup-form/SignUpForm';
import './Authentication.scss';

const Authentication = () => {
  // Since when we are redirected to the Google page, we lose all the state from the login page
  // and; we need te recover by using an effect and getting the information back with auth from
  // the redirect that just happened, using the singleton `Auth` that helps us to keep track of
  // all the authentication state happening throughout the application.
  // auth = authentication MEMORY BANK single instance.
  // useEffect will run on Mounting of the SignIn component
  // useEffect( () => {
  //     async function getRedirectUserResult() {
  //         const response = await getRedirectResult(auth);
  //
  //         console.log(response.user);
  //
  //         if (response) {
  //             const userDocRef =
  //                 await createUserDocumentFromAuth(response.user)
  //         }
  //     }
  //
  //     getRedirectUserResult();
  // }, [auth]);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
