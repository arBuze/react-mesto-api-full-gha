import { Route, Routes, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип 'Место'"/>
      <div className="header__info">
        <p className="header__user-email">{props.email}</p>
        <Routes>
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link>} />
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link" >Войти</Link>} />
          <Route path="/" element={<Link to="/sign-in" className="header__link" onClick={props.onSignOut} >Выйти</Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
