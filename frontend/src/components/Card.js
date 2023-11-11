import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.find(user => user === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDeleteClick(props.card);
  }

  return(
    <li className="photo-feed__item">
      <img className="photo-feed__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      {isOwn && <button className="photo-feed__del-btn" type="button" onClick={handleDeleteClick}></button>}
      <div className="photo-feed__data">
        <h2 className="photo-feed__heading">{props.card.name}</h2>
        <div className="photo-feed__likes">
          <button className={`photo-feed__like-btn ${isLiked && "like"}`} type="button" onClick={handleLikeClick}></button>
          <span className="photo-feed__likes-num">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
