import {useEffect, useState } from "react";
import {
    FaSearch,
    FaEdit
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import QRScanner from "../../components/QRScanner/QRScanner";
import "./Inventory.css";
import API_BASE_URL from "../../config/api";
export default function Inventory() {

    const [inventory, setInventory] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingItem, setEditingItem] = useState(null);

    const [quantity, setQuantity] = useState("");

    const [showScanner, setShowScanner] = useState(false);

    const [scannedProduct, setScannedProduct] = useState(null);

    useEffect(() => {

        loadInventory();

    }, []);

const loadInventory = async () => {
    try {
        const res = await fetch(
  `${API_BASE_URL}/api/inventory`
);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const result = await res.json();

        console.log(result);

        if (result.success && Array.isArray(result.data)) {
            setInventory(result.data);
        } else {
            console.error(result);
            setInventory([]);
        }

    } catch (err) {
        console.error("Inventory API Error:", err);
        setInventory([]);
    }
};

    const getStatus = (qty)=>{

        if(qty===0) return "Out Of Stock";

        if(qty<=10) return "Low Stock";

        return "In Stock";

    };

    const handleEdit = (item)=>{

        setEditingItem(item);

        setQuantity(item.quantity);

        setShowModal(true);

    };

    const updateQuantity = async ()=>{

        const res = await fetch(

            `${API_BASE_URL}/api/inventory/${editingItem.id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    quantity

                })

            }

        );

        const result = await res.json();

        if(result.success){

            alert("Quantity Updated");

            setShowModal(false);

            loadInventory();

        }else{

            alert(result.message);

        }

    };

    const filteredInventory = inventory.filter(item=>{

        return (

            item.name.toLowerCase().includes(search.toLowerCase())

            ||

            item.warehouse.toLowerCase().includes(search.toLowerCase())

        );

    });
const handleQRScan = async (decodedText) => {
    console.log("Scanned:", decodedText);

    setShowScanner(false);

    // QR must look like PRODUCT:2
    if (!decodedText.startsWith("PRODUCT:")) {
        alert("Invalid product QR code");
        return;
    }

    const productId = decodedText.split(":")[1];

    if (!Number.isInteger(productId) || productId <= 0) {
        alert("Invalid product ID");
        return;
    }

    console.log("Product ID:", productId);

    try {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/api/products/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        console.log("Scanned product:", result);

        if (!response.ok || !result.success) {
            alert(result.message || "Product not found");
            return;
        }

        setScannedProduct(result.data);

    } catch (error) {
        console.error("QR product error:", error);
        alert("Unable to load product");
    }
};
    return(

<div className="inventory-layout">

<Sidebar
    search={search}
    setSearch={setSearch}
/>

<main className="inventory-content">

<Navbar/>

<div className="inventory">

<div className="inventory-header">

    <div>
        <h1>Inventory</h1>
        <p>Manage warehouse stock</p>
    </div>

    <button
        className="scan-qr-btn"
        onClick={() => setShowScanner(true)}
    >
        Scan QR
    </button>

</div>

{/* Summary */}

<div className="stats-grid">

<div className="stat-card">

<h3>Total Items</h3>

<h1>{inventory.length}</h1>

</div>

<div className="stat-card">

<h3>Low Stock</h3>

<h1>

{

inventory.filter(i=>i.quantity<=10 && i.quantity>0).length

}

</h1>

</div>

<div className="stat-card">

<h3>Out Of Stock</h3>

<h1>

{

inventory.filter(i=>i.quantity===0).length

}

</h1>

</div>

<div className="stat-card">

<h3>Total Quantity</h3>

<h1>

{

inventory.reduce(

(sum,item)=>sum+Number(item.quantity),

0

)

}

</h1>

</div>

</div>

{/* Toolbar */}

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

{/* Table */}

<div className="table-card">

<table>

<thead>

<tr>

<th>Product</th>

<th>Warehouse</th>

<th>Aisle</th>

<th>Rack</th>

<th>Bin</th>

<th>Quantity</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{

filteredInventory.map(item=>(

<tr key={item.id}>

<td>{item.name}</td>

<td>{item.warehouse}</td>

<td>{item.aisle}</td>

<td>{item.rack}</td>

<td>{item.bin}</td>

<td>{item.quantity}</td>

<td>

<span

className={`status ${getStatus(item.quantity).replace(/\s/g,"").toLowerCase()}`}

>

{getStatus(item.quantity)}

</span>

</td>

<td>

<button

className="edit-btn"

onClick={()=>handleEdit(item)}

>

<FaEdit/>

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

{showModal && editingItem && (

    <div className="inventory-modal-overlay">

        <div className="inventory-edit-modal">

            <h2>Update Stock</h2>

            <p className="inventory-edit-product">
                {editingItem.name}
            </p>

            <label>Quantity</label>

            <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="inventory-modal-buttons">

                <button
                    className="inventory-update-btn"
                    onClick={updateQuantity}
                >
                    Update
                </button>

                <button
                    className="inventory-cancel-btn"
                    onClick={() => {
                        setShowModal(false);
                        setEditingItem(null);
                    }}
                >
                    Cancel
                </button>

            </div>

        </div>

    </div>

)}

{/* QR Scanner */}

{showScanner && (
    <QRScanner
        onScan={handleQRScan}
        onClose={() => setShowScanner(false)}
    />
)}


{/* Scanned Product */}

{scannedProduct && (
    <div className="modal-overlay">

        <div className="modal">

            <h2>Scanned Product</h2>

            <p>
                <strong>Name:</strong>{" "}
                {scannedProduct.name}
            </p>

            <p>
                <strong>SKU:</strong>{" "}
                {scannedProduct.sku}
            </p>

            <button
                className="cancel-btn"
                onClick={() => setScannedProduct(null)}
            >
                Close
            </button>

        </div>

    </div>
)}

</div>

</main>

</div>

);

}