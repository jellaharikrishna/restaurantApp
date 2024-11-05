import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <div className="header-container">
            <Link to="/" className="link">
              <h1 className="logo-heading">UNI Resto Cafe</h1>
            </Link>
            <div className="nav-items">
              <p className="my-order-txt">My Orders</p>
              <Link to="/cart" className="link">
                <button type="button" className="cart-icon-btn" data-testid="cart">
                  <IoCartOutline className="cart-icon" />
                  <span className="cart-count">{cartList.length}</span>
                </button>
              </Link>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
