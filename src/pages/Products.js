import { AllProductList } from "../components/AllProductList"
import "../styles/productlist.css"

export default function Products() {
    return (
        <div className="product-container">
            <div className="comp1">
                <AllProductList />
            </div>
            <div className="comp2">
                <AllProductList />
            </div>
        </div>
    )
}