const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const editAvatarButton = document.querySelector('.profile__avatar-btn');

const formList = Array.from(document.querySelectorAll(settings.formSelector));
const formValidators = {};

const cardListSelector = '.photo-feed__list';
const nameSelector = '.profile__name';
const statusSelector = '.profile__status';
const avatarSelector = '.profile__avatar';
const popupAddCardSelector = '.popup_type_add-place';
const popupProfileSelector = '.popup_type_edit-profile';
const popupPhotoSelector = '.popup_type_photo';
const popupEditAvatarSelector = '.popup_type_edit-avatar';
const popupDeleteSelector = '.popup_type_delete';

export { settings, editButton, addButton, editAvatarButton, formList, formValidators,
   cardListSelector, nameSelector, statusSelector, avatarSelector, popupAddCardSelector, popupProfileSelector, popupPhotoSelector, popupEditAvatarSelector, popupDeleteSelector };
