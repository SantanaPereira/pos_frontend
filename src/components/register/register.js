import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";




const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username is Too Short!")
    .max(50, "username is Too Long!")
    .required("username is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  )
});


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }

  submitForm = (values, history) => {
    axios
    .post(process.env.REACT_APP_API_URL + "register", values)
      .then(res => {
        console.log("É o POST do register = \n"+ res.data.result);
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success")
          .then(value => {
            window.location.replace("/login");
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", "Unexpected error", "error");
      });
  };
  

  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    
    return (
    <Form onSubmit={handleSubmit}>
      <div className="form-group input-group  has-feedback">
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={values.username}
          className="form-control"
          placeholder="Username"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user"></span>
            </div>
          </div>
          {errors.fullname && touched.fullname ? (
            <small id="passwordHelp" className="text-danger">
              {errors.username}
            </small>
          ) : null}
      </div>
      <div className="form-group input-group has-feedback">
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={values.email}
          placeholder="Email"
          className={
              errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
            }
        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user"></span>
            </div>
          </div>
          {errors.email && touched.email ? (
            <small id="passwordHelp" className="text-danger">
              {errors.email}
            </small>
          ) : null}
      </div>
      <div className="form-group input-group has-feedback">
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          className="form-control"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Password"
        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user"></span>
            </div>
          </div>
            {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
      </div>
      <div className="form-group input-group has-feedback">
        <input
          type="password"
          name="confirm_password"
          onChange={handleChange}
          className={
              errors.confirm_password && touched.confirm_password
                ? "form-control is-invalid"
                : "form-control"
            }
          placeholder="Confirm Password"
        />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user"></span>
            </div>
          </div>
         {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
      </div>
      <div className="row">
        <div className="col-md-12">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary btn-block btn-flat"
          >
            Confirm
          </button>
          <button
              type="button"
              onClick={() => {
                this.props.history.push("/login");
              }}
              className="btn btn-default btn-block btn-flat"
            >
              already member?
            </button>
        </div>
      </div>
    </Form>
  );}



  render() {
    return (
    <div className="login-page">
  <div className="lregister-box">
  <div className="register-logo">
    <a href="../../index2.html"><b>Basic</b>POS</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body register-card-body">
      <p className="login-box-msg">Register a new membership</p>

      <Formik
              initialValues={{
                fullname: "",
                email: "",
                password: "",
                confirm_password: ""
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.submitForm(values, this.props.history);
                setSubmitting(false);
              }}
              validationSchema={SignupSchema}
            >
     
     {/* {this.showForm()}            */}
     {props => this.showForm(props)}
        
            </Formik>
            <p className="mb-1">
                <Link to="/password/forgot">I forgot my password</Link>
              </p>
    
    </div>
    {/* /.login-card-body */}
  </div>
  {/* /.login-box */}
</div>
</div>
);
  }
}

export default Register;
