import { addItem } from '../../store/features/cart/cart.slice'
import { ShopItem } from '../../store/features/shop/shop.slice'
import { useAppDispatch } from '../../store/hooks'
import CustomButton from '../custom-button/CustomButton'
import './CollectionItem.sass'

// Display name, image, and price of each collection item
function CollectionItem({ item }: { item: ShopItem }) {
  const { name, price, imageUrl } = item
  const dispatch = useAppDispatch()

  const addItemToTheCart = () => dispatch(addItem(item))

  return (
    <div className="collection-item">
      <div
        className="image-wrapper"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="collection-footer">
          <span className="name">{name.toUpperCase()}</span>
        </div>{' '}
        <CustomButton onClick={addItemToTheCart} inverted>
          Add to cart {'$' + price}
        </CustomButton>
      </div>
    </div>
  )
}

export default CollectionItem
