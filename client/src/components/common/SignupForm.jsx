import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { toast } from "react-toastify";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("email is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .matches(/[0-9]/, "Password must contain at least one number")
        // .matches(
        //   /[@$!%*?&]/,
        //   "Password must contain at least one special character"
        // )
        .required("password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signupForm.resetForm();
        switchAuthState();
        toast.success("Sign up success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Email"
          name="email"
          fullWidth
          value={signupForm.values.email}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.email && signupForm.errors.email !== undefined
          }
          helperText={signupForm.touched.email && signupForm.errors.email}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
