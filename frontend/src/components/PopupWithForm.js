function PopupWithForm(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        <h2 className={`popup__heading ${props.isOpen && "popup__heading_type_confirm"}`}>{props.title}</h2>
        <form className="popup__form" method="post" name={`${props.name}-form`} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__save-btn" name="save-btn">{props.buttonTitle}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
