import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef('');

  useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return(
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonTitle="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={inputRef} type="url" required placeholder="Ссылка на картинку" className="popup__item popup__item_el_link" name="avatar" id="avatar-link-input"/>
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
