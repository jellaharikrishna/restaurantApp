import './index.css'

const MenuBarCategoryList = props => {
  const {menuCategoryDetails, isActive, onToggleMenuCategory} = props
  const {menuCategoryId, menuCategory} = menuCategoryDetails

  const menuCategoryClassname = isActive
    ? 'active-menucategoryname'
    : 'menucategoryname'

  const onClickMenuCategory = () => {
    onToggleMenuCategory(menuCategoryId)
  }

  return (
    <li className="menucategory-li" onClick={onClickMenuCategory}>
      <button type="button" className={menuCategoryClassname}>
        {menuCategory}
      </button>
    </li>
  )
}
export default MenuBarCategoryList
