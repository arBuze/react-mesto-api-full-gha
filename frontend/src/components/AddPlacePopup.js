import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  return(
    <PopupWithForm name="add-place" title="Новое место" buttonTitle="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" required placeholder="Название" className="popup__item popup__item_el_title" name="title" id="title-input" minLength="2" maxLength="30"
        value={name ? name : ''} onChange={handleNameChange} />
      <span className="popup__input-error title-input-error"></span>
      <input type="url" required placeholder="Ссылка на картинку" className="popup__item popup__item_el_link" name="link" id="link-input"
        value={link ? link : ''} onChange={handleLinkChange} />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
