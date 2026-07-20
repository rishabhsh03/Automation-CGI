import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Products.css";

export default function Products() {
    const API = "http://localhost:8000/api/products";

    const [products, setProducts] = useState([]);
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editing, setEditing] = useState(false);

    const [product, setProduct] = useState({
        sku: "",
        name: "",
        category: "",
        reorder_threshold: "",
        reorder_qty: ""
    });

    const loadProducts = () => {

        fetch(API)

            .then(res => res.json())

            .then(result => {
                console.log(result.data);
                if(result.success){

                    setProducts(result.data);

                }

            });

    };

    useEffect(() => {

        loadProducts();

    }, []);

    const filteredProducts = products.filter((item)=>{

        return (

            item.name?.toLowerCase().includes(search.toLowerCase())

            ||

            item.sku?.toLowerCase().includes(search.toLowerCase())

            ||

            item.category?.toLowerCase().includes(search.toLowerCase())

        );

    });

    const handleAdd = ()=>{

        setEditing(false);

        setProduct({

            sku:"",
            name:"",
            category:"",
            reorder_threshold:"",
            reorder_qty:""

        });

        setShowModal(true);

    };

    const handleEdit = (item)=>{

        setEditing(true);

        setProduct(item);

        setShowModal(true);

    };

    const saveProduct = async ()=>{
        
        if (Number(product.reorder_qty) < 0){
            alert
        }
        const url = editing
    ? `${API}/${product.id}`
    : API;
        const method = editing ? "PUT" : "POST";

        const res = await fetch(url,{

            method,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(product)

        });

        const result = await res.json();

        if(result.success){

            alert(editing ? "Product Updated" : "Product Added");

            setShowModal(false);

            loadProducts();

        }else{

            alert(result.message);

        }

    };
const deleteProduct = async (Id) => {

    const res = await fetch(
    `${API}/${deleteId}`,
    {
        method: "DELETE"
    }
);

    const result = await res.json();

    if (result.success) {
        loadProducts();
        setShowDeleteModal(false);
        setDeleteId(null);
    } else {
        alert(result.message);
    }
};

    return (

<div className="products-layout">

<Sidebar/>

<main className="products-content">

<Navbar/>

<div className="products-page">

<div className="products-header">

<div>

<h1>Products</h1>

<p>Manage all products</p>

</div>

<button
className="add-btn"
onClick={handleAdd}
>

<FaPlus/>

Add Product

</button>

</div>

<div className="toolbar">

<div className="search-box">

<FaSearch/>

<input

type="text"

placeholder="Search Product"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

</div>

<div className="table-card">

<table>

<thead>

<tr>

<th>SKU</th>

<th>Name</th>

<th>Category</th>

<th>Reorder Level</th>

<th>Reorder Qty</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredProducts.map(item=>(

<tr key={item.id}>

<td>{item.sku}</td>

<td>{item.name}</td>

<td>{item.category}</td>

<td>{item.reorder_threshold}</td>

<td>{item.reorder_qty}</td>

<td>

<div className="action-buttons">

<button
className="edit-btn"
onClick={()=>handleEdit(item)}
>

<FaEdit/>

</button>

{!item.in_inventory && (
<button
className="delete-btn"
onClick={()=> {
    setDeleteId(item.id);
    setShowDeleteModal(true);
}}
>

<FaTrash/>

</button>
)}
</div>

</td>
</tr>

))

}

</tbody>

</table>

</div>

</div>
{/* products-page */}
{showDeleteModal && (

<div className="modal-overlay">

    <div className="delete-modal">

        <h2>Delete Product</h2>

        <p>
            Are you sure you want to delete this product?
        </p>

        <div className="delete-buttons">

            <button
                className="cancel-btn"
                onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                }}
            >
                Cancel
            </button>

            <button
                className="confirm-delete-btn"
                onClick={deleteProduct}
            >
                Delete
            </button>

        </div>

    </div>

</div>

)}
{

showModal && (

<div className="modal-overlay">

<div className="modal">

<h2>

{

editing

?

"Edit Product"

:

"Add Product"

}

</h2>

<input

placeholder="SKU"

value={product.sku}

onChange={(e)=>setProduct({

...product,

sku:e.target.value

})}

/>

<input

placeholder="Product Name"

value={product.name}

onChange={(e)=>setProduct({

...product,

name:e.target.value

})}

/>

<input

placeholder="Category"

value={product.category}

onChange={(e)=>setProduct({

...product,

category:e.target.value

})}

/>

<input

type="number"

placeholder="Reorder Threshold"

value={product.reorder_threshold}

onChange={(e)=>setProduct({

...product,

reorder_threshold:e.target.value

})}

/>

<input

type="number"

placeholder="Reorder Qty"

value={product.reorder_qty}

onChange={(e)=>setProduct({

...product,

reorder_qty:e.target.value

})}

/>

<div className="modal-buttons">

<button

className="save-btn"

onClick={saveProduct}

>

Save

</button>

<button

className="cancel-btn"

onClick={()=>setShowModal(false)}

>

Cancel

</button>

</div>

</div>

</div>

)

}

</main>

</div>

);

}