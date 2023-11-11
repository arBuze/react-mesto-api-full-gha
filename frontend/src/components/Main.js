import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__information">
            <button className="profile__avatar-btn" type="button" onClick={props.onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля"/>
            </button>
            <div className="profile__info">
              <div className="profile__item">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__status">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
        </div>
      </section>
      <section className="photo-feed">
        <ul className="photo-feed__list">
          {props.cards.slice().reverse().map((data) => {
            return(<Card key={data._id} card={data} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDeleteClick={props.onCardDeleteClick}/>)
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
