import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schemas
const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = (data) => {
    console.log(isLogin ? "Login Data:" : "Registration Data:", data);
    alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  fullWidth
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            {!isLogin && (
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {isLogin ? "Login" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box textAlign="center" marginTop={2}>
          <Typography variant="body2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register here" : "Login here"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
