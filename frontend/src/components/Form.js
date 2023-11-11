function Form(props) {
  return(
    <form className="login__form" method="post" name="" onSubmit={props.onSubmit}>
      <input type="email"
        required
        placeholder="Email"
        className="login__item login__item_el_title"
        name="email"
        value={props.emailValue}
        id="email-input"
        minLength="2"
        maxLength="30"
        onChange={props.onChange} />
      <span className="login__input-error email-input-error"></span>
      <input type="password"
        required
        placeholder="Пароль"
        className="login__item login__item_el_link"
        name="password"
        value={props.passwordValue}
        id="password-input"
        onChange={props.onChange} />
      <span className="login__input-error password-input-error"></span>
      <button className="login__submit-btn" type="submit">{props.buttonTitle}</button>
    </form>
  )
}

export default Form;
