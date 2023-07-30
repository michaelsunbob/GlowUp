import { useState } from "react";
import "../styles/temp.css"

export const ProductList = () => {

    const [productList, setProductList] = useState([{ product: "" }]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...productList];
        list[index][name] = value;
        setProductList(list);
    };

    const handleRemove = (index) => {
        const list = [...productList];
        list.splice(index, 1);
        setProductList(list);
    };

    const handleAdd = () => {
        setProductList([...productList, { product: "" }]);
    };

    return (
        <form className="products" autoComplete="off">
            <div className="form-field">
                <label htmlFor="service">Product Lists</label>
                {productList.map((singleProduct, index) => (
                    <div key={index} className="services">
                        <div className="first-column">
                            <input
                                name="product"
                                type="text"
                                id="product"
                                value={singleProduct.product}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                            {productList.length - 1 === index && productList.length < 6 && (
                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    className="add-btn"
                                >
                                    <span>Add a new list</span>
                                </button>
                            )}
                        </div>
                        <div className="second-column">
                            {productList.length !== 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="remove-btn"
                                >
                                    <span>Remove</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="output">
                <h2>Your Products</h2>
                {productList &&
                    productList.map((singleProduct, index) => (
                        <ul key={index}>
                            {singleProduct.product && <li>{singleProduct.product}</li>}
                        </ul>
                    ))}
            </div>
        </form>
    )
}