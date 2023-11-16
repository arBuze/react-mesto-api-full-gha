import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { auth } from "../utils/AuthApi";

function Login(props) {
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
    auth.authorize(formValue.email, formValue.password)
      .then(data => {
        if (data){
          props.onLogin(formValue.email, data.token);
          setFormValue({email: '', password: ''});
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        props.onFailure();
        console.log(err);
      });
  }

  return(
    <main className="content">
      <section className="login login__type_sign-in">
        <h2 className="login__title">Вход</h2>
        <Form buttonTitle="Войти" emailValue={formValue.email} passwordValue={formValue.password} onSubmit={handleSubmit} onChange={handleChange} />
      </section>
    </main>
  );
}

export default Login;
