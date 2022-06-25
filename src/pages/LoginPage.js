import React, { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Alert,
  Stack,
  InputAdornment,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().max(8).required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: false,
};

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    const from = location.state?.form?.pathname || "/";
    //if we have previous location then go back to that location or else go to homepage.
    let { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        console.log(email);
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <Alert severity="info">
            Don't have an account?{" "}
            <Link
              component={NavLink}
              variant="subtitle2"
              underline="hover"
              to="/register"
            >
              Register here
            </Link>
          </Alert>
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FCheckbox name="remember" label="Remember me" />
            <Link
              component={NavLink}
              underline="hover"
              variant="subtitle2"
              to="/register"
            >
              Forgot your password?
            </Link>
          </Stack>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
