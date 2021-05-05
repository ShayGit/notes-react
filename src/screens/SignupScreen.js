import * as Yup from 'yup';

import { Avatar, Button, CircularProgress, Container, CssBaseline, TextField, Typography, makeStyles } from "@material-ui/core";
import { init, signup } from '../Slices/userSlice';

import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

const SignupScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, errors,userInfo } = useSelector((state) => state.user);
  const history = useHistory();


  const formik = useFormik({
    initialValues: {
      username: '',
      password:'',
      password2:''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be atleast 6 characters')
        .required('Required')
    }),
    onSubmit: values => {
      dispatch(signup(values));
    },
  });

  if (status==="succeeded") {
    setTimeout(() => {
      history.push("/signin");
    }, 2000);
  }

  if (userInfo) {
      history.push("/");
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
          Sign up
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
            {...formik.getFieldProps('username')}
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
            error={formik.touched.password &&formik.errors.password}
            helperText={formik.errors.password}
            {...formik.getFieldProps('password')}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password2"
            label="Repeat Password"
            type="password"
            id="password2"
            error={formik.touched.password2 &&formik.errors.password2}
            helperText={formik.errors.password2}
            {...formik.getFieldProps('password2')}
            autoComplete="current-password"
          />
        {status === "failed" &&
            errors.map((error) => <Alert severity="error">{error}</Alert>)}

          {status === "loading" && (
            <Alert severity="info" action={<CircularProgress size={20} />}>
              Loading...
            </Alert>
          )}

          {status === "succeeded" && (
            <Alert severity="success">Success, redirecting to signin...</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Sign up
          </Button>
          
        </form>
      </div>
    </Container>
  )
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default SignupScreen;
