import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return(
    <PopupWithForm name="delete" title="Вы уверены?" buttonTitle="Да" isOpen={props.card} onClose={props.onClose} onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default DeleteCardPopup;
