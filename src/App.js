import "./App.css";
import { Button, Paper, TextField } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { memo, useCallback, useState } from "react";

const MemoizedTextField = memo(({ label, type, name, value, onChange }) => (
  <TextField
    label={label}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
  />
));

function App() {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const initialError = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const reset = () => {
    setFormData(initialFormData);
  };

  const validateForm = () => {
    // console.log("validation running");
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.cPassword) errors.cPassword = "Confirm Password is required";
    if (formData.password !== formData.cPassword)
      errors.cPassword = "Passwords do not match";
    setError(errors);
    console.log(errors, "errors");
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;
      setIsSubmitting(true);
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 2000)
      );
      console.log(formData, "formData");
      reset();
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }, []);

  return (
    <div className="flex items-center min-h-screen mx-auto w-fit">
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} className="flex flex-col w-full gap-4 p-4">
          <MemoizedTextField
            label="Name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
          {error.name && <p className="text-red-500">{`${error.name}`}</p>}
          <MemoizedTextField
            label="Email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
          {error.email && <p className="text-red-500">{`${error.email}`}</p>}

          <MemoizedTextField
            label="Password"
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
          {error.password && (
            <p className="text-red-500">{`${error.password}`}</p>
          )}

          <MemoizedTextField
            label="Conform Password"
            type="text"
            onChange={handleChange}
            name="cPassword"
            value={formData.cPassword}
          />
          {error.cPassword && (
            <p className="text-red-500">{`${error.cPassword}`}</p>
          )}

          <LoadingButton
            size="large"
            loading={isSubmitting}
            variant="outlined"
            className=""
            type="submit"
          >
            Submit
          </LoadingButton>
        </Paper>
      </form>
    </div>
  );
}

export default App;
