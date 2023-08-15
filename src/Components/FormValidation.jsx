import React, { useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
function FormValidation(props) {
  const [customer, SetCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pin: 0,
    birthdate: "",
  });

  const [errors, Seterrors] = useState({});
  const schema =({
    firstname: Joi.string().required().min(1).max(20),
    lastname: Joi.string().required(),
    email: Joi.string().required().email({tlds:{allow: false}}),



    pin: Joi.number().min(1000).max(9999).required(),
    birthdate: Joi.date().min("2000-01-01").required(),
  });
  const validateform = (event) => {
    event.preventDefault();
    const result = Joi.validate(customer, schema, { abortEarly: false });


    // validationSchema.validate(request)




    console.log(result);
    const { error } = result;
    if (!error) {
      return null;
    } else {
      const errordata = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errordata[name] = message;
      }

      console.log(errors);
      Seterrors(errordata);
      return errordata;
    }
  };

  const handlesave = (event) => {
    const { name, value } = event.target;
    let errordata = { ...errors };
    const errormessage = validateProperty(event);
    if (errormessage) {
      errordata[name] = errormessage;
    } else {
      delete errordata[name];
    }
    let customerdata = { ...customer };
    customerdata[name] = value;
    SetCustomer(customerdata);
    Seterrors(errordata);
  };

  const validateProperty = (Event) => {
    const { name, value } = Event.target;
    const obj = { [name]: value };
    const subschema = { [name]: schema[name] };
    const result = Joi.validate(obj, subschema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  const clearstate = () => {
    SetCustomer({
      firstname: "",
      lastname: "",
      email: "",
      pin: "",
      birthdate: "",
    });
  };

  return (
    <div>
      <h3>Add Customer Here</h3>
      <hr />
      <form className="ui form ">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            value={customer.firstname}
            onChange={handlesave}
          />
        </div>

        {errors.firstname && (
          <div className="alert alert-danger">{errors.firstname}</div>
        )}

        <div className="form-group">
          <label>LastName:</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            value={customer.lastname}
            onChange={handlesave}
          />
        </div>
        {errors.lastname && (
          <div className="alert alert-danger">{errors.lastname}</div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={customer.email}
            onChange={handlesave}
          />
        </div>
        {errors.email && (
          <div className="alert alert-danger">{errors.email}</div>
        )}

        <div className="form-group">
          <label>PIN</label>
          <input
            type="text"
            className="form-control"
            value={customer.pin}
            onChange={handlesave}
          />
        </div>
        {errors.birthdate && (
          <div className="alert alert-danger">{errors.birthdate}</div>
        )}
        <div className="btn">
          <button
            type="submit"
            onClick={validateform}
            className="btn btn-success"
          >
            {" "}
            Add Customer
          </button>
          <button type="submit" ></button>
        </div>
      </form>
    </div>
  );
}

export default FormValidation;
