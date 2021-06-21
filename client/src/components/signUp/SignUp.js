import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Style from "./Style";
import { Link } from "react-router-dom";
import UserContext from "../../context/productsContext/userContext/UserContext";
import SnackbarOpen from "../snackbar/SnackBar";
import SnackBarContext from "../../context/snackbarContext/SnackbarContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import PhoneInput from 'react-phone-input-2'
import "./styles.css";
import 'react-phone-input-2/lib/material.css'
export default function SignUp(props) {
  const classes = Style();

  //userContext
  const userContext = useContext(UserContext)
  const { authenticated, registerUser } = userContext

  // context Snakbar
  const snackbarContext = useContext(SnackBarContext)
  const { error, openSnackbar, closeSnackbar } = snackbarContext

  // hook de create user
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmar: "",
    phone: "",
    dni: "",
    alternativePhone: "",
    cp: "",
    gender: "",
    admin: false
  })
  // destroyoning del hook user
  const { firstName, lastName, email, password, confirmar, admin, phone, alternativePhone,cp,dni } = user

  useEffect(() => {
    if (authenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const onChangePhone = (e) => {
    setUser({
      ...user,
      phone: e
    })
  }
  const onChangeAlternativePhone = (e) => {
    setUser({
      ...user,
      alternativePhone: e
    })
  }

  const loginButtonDisabled = () => {
    return isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password) || isEmpty(confirmar)
  }

  const isEmpty = (aField) => {
    return aField === "";
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmar) {
      openSnackbar("las contraseñas no coinciden", "error")
    }
    else {
      closeSnackbar()
      registerUser({ firstName, lastName, email, password, admin })
    }

  }

  return (

    <div className={classes.main}>

      <Card className={classes.roots} >
        <CssBaseline />
        <CardContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrate
        </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    value={firstName}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="apellido"
                    name="lastName"
                    autoComplete="lname"
                    value={lastName}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmar"
                    label="confirmar password"
                    type="password"
                    id="confirmar"
                    autoComplete="current-password"
                    value={confirmar}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={6} >

                  <PhoneInput placeholder="ingrese su telefono" country={'ar'} value={phone} onChange={e => onChangePhone(e)} inputProps={{ required: true }} />
                </Grid>
                <Grid item xs={6}>
                  <PhoneInput placeholder="ingrese su telefono" country={'ar'} value={alternativePhone} onChange={e => onChangeAlternativePhone(e)} />

                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="dni"
                    label="DNI"
                    type="number"
                    id="Dni"
                    autoComplete="Dni"
                    value={dni}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="cp"
                    label="Cp"
                    type="number"
                    id="cp"
                    autoComplete="cp"
                    value={cp}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset" className={classes.genero}>
                    <FormLabel component="legend">Genero</FormLabel>

                    <RadioGroup row aria-label="position" name="gender" className={classes.generoRadio} onChange={onChange}>
                      <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                      <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                      <FormControlLabel value="other" control={<Radio />} label="indefinido" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>




              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loginButtonDisabled()}
              >REGISTRARME</Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={"/"} variant="body2">
                    obtener cuenta
              </Link>
                </Grid>
              </Grid>
              {error ?
                <SnackbarOpen /> : null
              }
            </form>
          </div>
        </CardContent>
      </Card>
    </div>

  );
}
