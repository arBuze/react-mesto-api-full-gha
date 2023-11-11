import React, { useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonTitle="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" required placeholder="Никнейм" className="popup__item popup__item_el_name" name="nickname" id="name-input" minLength="2" maxLength="40"
        value={name ? name : ''} onChange={handleNameChange} />
      <span className="popup__input-error name-input-error"></span>
      <input type="text" required placeholder="Статус" className="popup__item popup__item_el_status" name="status" id="status-input" minLength="2" maxLength="200"
        value={description ? description : ''} onChange={handleDescriptionChange} />
      <span className="popup__input-error status-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
