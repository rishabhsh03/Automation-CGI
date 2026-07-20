import { useEffect, useState } from "react";
import {
    FaSearch,
    FaEdit
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Inventory.css";

export default function Inventory() {

    const [inventory, setInventory] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingItem, setEditingItem] = useState(null);

    const [quantity, setQuantity] = useState("");

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        const res = await fetch("http://localhost:8000/api/inventory");

        const result = await res.json();

        if(result.success){

            setInventory(result.data);

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

            `http://localhost:8000/api/inventory/${editingItem.id}`,

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

    return(

<div className="inventory-layout">

<Sidebar/>

<main className="inventory-content">

<Navbar/>

<div className="inventory">

<div className="inventory-header">

<div>

<h1>Inventory</h1>

<p>Manage warehouse stock</p>

</div>

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

{/* Edit Modal */}

{

showModal && (

<div className="modal-overlay">

<div className="modal">

<h2>

Update Stock

</h2>

<p>

<b>

{

editingItem.name

}

</b>

</p>

<input

type="number"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

/>

<div className="modal-buttons">

<button

className="save-btn"

onClick={updateQuantity}

>

Update

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

</div>

</main>

</div>

);

}