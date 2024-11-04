import {Component} from 'react'
import './App.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import MenuBarCategoryList from './components/MenuBarCategoryList'
import DishesList from './components/DishesList'

class App extends Component {
  state = {
    restaurantName: '',
    tableMenuList: [],
    activeMenuCategoryId: '',
    activeMenuCategoryDishesList: [],
    cartList: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(apiUrl)
    const data = await response.json()
    const dataObj = data[0]

    this.setState({
      restaurantName: dataObj.restaurant_name,
      activeMenuCategoryId: dataObj.table_menu_list[0].menu_category_id,
      activeMenuCategoryDishesList: dataObj.table_menu_list[0].category_dishes.map(
        eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishImage: eachDish.dish_image,
          dishPrice: eachDish.dish_price,
          dishCurrency: eachDish.dish_currency,
          dishDescription: eachDish.dish_description,
          dishCalories: eachDish.dish_calories,
          dishType: eachDish.dish_Type,
          dishAvailability: eachDish.dish_Availability,
          nexturl: eachDish.nexturl,
          addonCatList: eachDish.addonCat,
        }),
      ),

      tableMenuList: dataObj.table_menu_list.map(eachCategory => ({
        menuCategoryId: eachCategory.menu_category_id,
        menuCategory: eachCategory.menu_category,
        categoryDishesList: eachCategory.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishImage: eachDish.dish_image,
          dishPrice: eachDish.dish_price,
          dishCurrency: eachDish.dish_currency,
          dishDescription: eachDish.dish_description,
          dishCalories: eachDish.dish_calories,
          dishType: eachDish.dish_Type,
          dishAvailability: eachDish.dish_Availability,
          nexturl: eachDish.nexturl,
          addonCatList: eachDish.addonCat,
        })),
      })),
    })
  }

  onToggleMenuCategory = id => {
    const {tableMenuList} = this.state

    const filteredList = tableMenuList.filter(
      eachList => eachList.menuCategoryId === id,
    )

    this.setState({
      activeMenuCategoryId: id,
      activeMenuCategoryDishesList: filteredList[0].categoryDishesList,
    })
  }

  addCartItem = dish => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)
    if (dish.dishQuanity === 0) {
      this.setState({cartList: []})
    } else if (!isAlreadyExists) {
      this.setState(prevState => ({cartList: [...prevState.cartList, dish]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, dishQuanity: dish.dishQuanity}
            : item,
        ),
      }))
    }
  }

  render() {
    const {
      restaurantName,
      tableMenuList,
      activeMenuCategoryId,
      activeMenuCategoryDishesList,
      cartList,
    } = this.state
    console.log(cartList)

    return (
      <>
        <div className="header-div">
          <div className="header-card">
            <h1 className="restaurantname">{restaurantName}</h1>
            <div className="desktop-myorders-card">
              <h1 className="myorders">My Orders</h1>
              <div className="carticon-dishcount-card">
                <AiOutlineShoppingCart className="carticon" />
                <p className="dishcount">
                  {cartList.length > 0 ? cartList.length : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="menucategory-div">
          <ul className="menucategory-ul-card">
            {tableMenuList.map(each => (
              <MenuBarCategoryList
                key={each.menuCategoryId}
                menuCategoryDetails={each}
                isActive={each.menuCategoryId === activeMenuCategoryId}
                onToggleMenuCategory={this.onToggleMenuCategory}
              />
            ))}
          </ul>
        </div>
        <div className="menulist-div">
          <ul className="menulist-ul-card">
            {activeMenuCategoryDishesList.map(eachDish => (
              <DishesList
                key={eachDish.dishId}
                categoryDishesList={eachDish}
                addCartItem={this.addCartItem}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default App
