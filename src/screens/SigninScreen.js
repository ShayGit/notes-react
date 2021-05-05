import * as Yup from "yup";

import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { init, signin } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useEffect } from "react";
import { useFormik } from "formik";

const AuthScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, errors, userInfo } = useSelector((state) => state.user);
  const history = useHistory();


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Must be atleast 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(signin(values));
    },
  });
  
  if (userInfo) {
    if(status=== 'idle'){
      history.push("/");
    }
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }

  useEffect(() => {
    if (!userInfo) {
    dispatch(init())
    }
  }, [dispatch, userInfo])
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            error={formik.touched.username && formik.errors.username}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...formik.getFieldProps("username")}
            helperText={formik.errors.username}
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={formik.touched.password && formik.errors.password}
            helperText={formik.errors.password}
            {...formik.getFieldProps("password")}
            autoComplete="current-password"
          />

          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="remember"
                value={formik.values.remember}
                {...formik.getFieldProps("remember")}
              />
            }
            label="Remember me"
          />
          {status === "failed" &&
            errors.map((error) => <Alert severity="error">{error}</Alert>)}

          {status === "loading" && (
            <Alert severity="info" action={<CircularProgress size={20} />}>
              Loading...
            </Alert>
          )}

          {status === "succeeded" && (
            <Alert severity="success">Success, redirecting...</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>

          <Link to="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
    </Container>
  );
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default AuthScreen;
