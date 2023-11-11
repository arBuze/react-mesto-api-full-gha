import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import { auth } from "../utils/AuthApi";

function Register(props) {
  const [formValue, setFormValue] = useState({email:'', password: ''});
  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    auth.register(formValue.email, formValue.password)
      .then((res) => {
        if(res.error) {
          props.onFailure();
          console.log(res.error);
          return;
        }
        props.onRegister();
        navigate('/sign-in', {replace: true});
      })
      .catch(err => {
        props.onFailure(); /* если регистрировать на тот же email, catch не выполняется */
        console.log(err);
      });
  }

  return(
    <main className="content">
      <section className="login login__type_sign-up">
        <h2 className="login__title">Регистрация</h2>
        <Form buttonTitle="Зарегистрироваться" emailValue={formValue.email} passwordValue={formValue.password} onSubmit={handleSubmit} onChange={handleChange}/>
        <p className="login__register">Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link></p>
      </section>
    </main>
  );
}

export default Register;
