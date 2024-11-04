import {useState} from 'react'
import './index.css'

const DishesList = props => {
  const [dishQuanity, setDishQuanity] = useState(0)
  const {categoryDishesList, addCartItem} = props

  const {
    dishType,
    dishName,
    dishCurrency,
    dishPrice,
    dishDescription,
    dishAvailability,
    addonCatList,
    dishCalories,
    dishImage,
  } = categoryDishesList

  const onClickDecrement = () =>
    setDishQuanity(prevState => (prevState === 0 ? prevState - 1 : 0))

  const onClickIncrement = () => setDishQuanity(prevState => prevState + 1)

  const onAddItemToCart = () => {
    addCartItem({...categoryDishesList, dishQuanity})
  }

  return (
    <li className="menulist-li">
      <div className="dish-details-card">
        {dishType === 2 && (
          <img
            className="veg-nonveg-icon"
            src="https://res.cloudinary.com/dmogabwqz/image/upload/v1729865265/veg_logo_ibms9m.png"
            alt="veg"
          />
        )}
        {dishType === 1 && (
          <img
            className="veg-nonveg-icon"
            src="https://res.cloudinary.com/dmogabwqz/image/upload/v1729865434/non-veg_logo._hd0ihg.png"
            alt="non veg"
          />
        )}
        <div className="dishdescription-card">
          <h1 className="dishname">{dishName}</h1>
          <p className="dishprice">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dishdescription">{dishDescription}</p>
          {dishAvailability ? (
            <div className="addtocart-card">
              <button
                type="button"
                className="addtocart-btn"
                onClick={onClickDecrement}
              >
                -
              </button>
              <p className="addtocart-count">{dishQuanity}</p>
              <button
                type="button"
                className="addtocart-btn"
                onClick={onClickIncrement}
              >
                +
              </button>
            </div>
          ) : (
            <p className="notavailable">Not available</p>
          )}
          {addonCatList.length > 0 && (
            <p className="customizationsname">Customizations available</p>
          )}
          {dishQuanity > 0 && (
            <button
              type="button"
              className="btn btn-outline-primary mt-3"
              onClick={onAddItemToCart}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
      <p className="calories">{dishCalories} calories</p>
      <img className="dish-image" src={dishImage} alt="dishimage" />
    </li>
  )
}

export default DishesList
