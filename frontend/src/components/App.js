import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProptectedRoute';
import { api } from '../utils/Api';
import { auth } from '../utils/AuthApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  /* загрузка данных пользователя и массива карточек */
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch( err => {
          console.log(err);
        });
    }
  },[loggedIn])

  /* проверка токена */
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      auth.checkToken(token)
        .then(res => {
          if(res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            navigate('/', {replace: true});
          }
        })
        .catch(err => {
          localStorage.removeItem('jwt');
          console.log(err);
        });
    }
  }, [navigate])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setSelectedCardDelete(null);
    setIsInfoToolTipOpen(false);
  }

  /* обработчики для работы с карточкой */
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.find(user => user === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, localStorage.getItem('jwt'))
      .then( newCard => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch( err => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setSelectedCardDelete(card);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.getItem('jwt'))
      .then(() => {
        setCards(cards.filter(item => !(item._id === card._id)));
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  /* обработчики сабмитов */
  function handleUpdateUser({name, about}) {
    api.saveUserInfo(name, about, localStorage.getItem('jwt'))
      .then( userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.saveAvatar(avatar, localStorage.getItem('jwt'))
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard(name, link, localStorage.getItem('jwt'))
      .then( newCard => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  /* для авторизации и регистрации */
  function handleLogin(email) {
    setUserEmail(email);
    setLoggedIn(true);
  }

  function handleRegister() {
    setIsSuccessful(true);
    setIsInfoToolTipOpen(true);
  }

  function handleFailure() {
    setIsSuccessful(false);
    setIsInfoToolTipOpen(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    setUserEmail('');
    auth.signOut(localStorage.getItem('jwt'));
    localStorage.removeItem('jwt');
  }

  return (
    <div className="page__content">
      <Header email={userEmail} onSignOut={handleSignOut} />
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* для авторизации */}
          <Route path="/sign-in"
            element={
              <Login onLogin={handleLogin} onFailure={handleFailure} />
            }
          />
          {/* для регистрации */}
          <Route path="/sign-up"
            element={
              <Register onRegister={handleRegister} onFailure={handleFailure} />
            }
          />
          {/* основная страница */}
          <Route path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn}
            userEmail={userEmail}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick}
            onSignOut={handleSignOut} />} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>

        {/* попап редактирования профиля */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      </CurrentUserContext.Provider>

      { loggedIn && <Footer /> }

      {/* попап редактирования аватара */}
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      {/* попап добавления карточки */}
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      {/* попап с картинкой */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      {/* попап с подтверждением */}
      <DeleteCardPopup card={selectedCardDelete} onClose={closeAllPopups} onCardDelete={handleCardDelete}/>
      {/* попап оповещения*/}
      <InfoToolTip isOpen={isInfoToolTipOpen} isSuccessful={isSuccessful} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
