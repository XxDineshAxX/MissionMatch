import SignUpForm from "../SignUpForm";
import React, { useEffect } from "react";
function SignUp() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SignUpForm></SignUpForm>
    </>
  );
}

export default SignUp;
