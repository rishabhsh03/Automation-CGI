import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaBuilding,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Suppliers.css";

export default function Supplier() {
  console.log("✅ supplierRoutes loaded");
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    avg_delivery_date: "",
    status: "ACTIVE",
    organization_id: 1,
  });

  console.log("Suppliers:", suppliers);
  const filteredSuppliers = suppliers.filter((item) => {

    const searchText = search.toLowerCase();

    return (
        (item.name ?? "").toLowerCase().includes(searchText) ||
        (item.contact_person ?? "").toLowerCase().includes(searchText) ||
        (item.email ?? "").toLowerCase().includes(searchText) ||
        (item.phone ?? "").toLowerCase().includes(searchText) ||
        (item.city ?? "").toLowerCase().includes(searchText)
    );

});
  const supplierSummary = {
    totalSuppliers: suppliers.length,

    activeSuppliers: suppliers.filter(
      (supplier) => supplier.status === "ACTIVE",
    ).length,

    inactiveSuppliers: suppliers.filter(
      (supplier) => supplier.status === "INACTIVE",
    ).length,

    averageDelivery: (
      suppliers.reduce((sum, supplier) => sum + supplier.avg_delivery_date, 0) /
      suppliers.length
    ).toFixed(1),
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/supplier")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setSuppliers(result.data);
        }
      });
  }, []);
  const loadSuppliers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/supplier");

      const result = await res.json();

      if (result.success) {
        setSuppliers(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);
  const handleDelete = async(id)=>{

    if(!window.confirm("Delete Supplier?")) return;

    try{

        const res = await fetch(

            `http://localhost:8000/api/supplier/${id}`,

            {

                method:"DELETE"

            }

        );

        const result = await res.json();

        alert(result.message);

        loadSuppliers();

    }catch(err){

        console.error(err);

    }

};
const handleSubmit = async () => {

    const url = editingId
        ? `http://localhost:8000/api/supplier/${editingId}`
        : "http://localhost:8000/api/supplier";

    const method = editingId ? "PUT" : "POST";

    try {

        const res = await fetch(url, {

            method,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(formData)

        });

        const result = await res.json();

        alert(result.message);

        setShowModal(false);

        loadSuppliers();

    } catch(err){

        console.error(err);

    }

};
  return (
    <div className="supplier-layout">
      <Sidebar />

      <main className="supplier-content">
        <Navbar />

        <div className="supplier-page">
          {/* Header */}

          <div className="supplier-header">
            <div>
              <h1>Suppliers</h1>

              <p>Manage supplier information</p>
            </div>

            <button
              className="add-btn"
              onClick={() => {
                setEditingId(null);

                setFormData({
                  name: "",
                  contact_person: "",
                  email: "",
                  phone: "",
                  city: "",
                  address: "",
                  avg_delivery_date: "",
                  status: "ACTIVE",
                  organization_id: 1,
                });

                setShowModal(true);
              }}
            />
          </div>

          {/* KPI Cards */}

          <div className="supplier-cards">
            <div className="supplier-card">
              <FaBuilding />

              <div>
                <h3>Total Suppliers</h3>

                <h2>{supplierSummary.totalSuppliers}</h2>
              </div>
            </div>

            <div className="supplier-card">
              <FaEnvelope />

              <div>
                <h3>Contact Info</h3>
                <h2>{supplierSummary.contactInfo}</h2>
              </div>
            </div>

            <div className="supplier-card">
              <FaPhone />

              <div>
                <h3>Avg Delivery</h3>
                <h2>{supplierSummary.averageDelivery} Days</h2>
              </div>
            </div>
          </div>

          {/* Search */}

          <div className="toolbar">
            <div className="search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search Supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Person</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredSuppliers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.contact_person}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.city}</td>
                    <td>{item.status}</td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setEditingId(item.id);

                            setFormData(item);

                            setShowModal(true);
                          }}
                        />

                        <button
    className="delete-btn"
    onClick={() => handleDelete(item.id)}
/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModal && (

<div className="modal-overlay">

<div className="modal">

<h2>

{editingId ? "Edit Supplier" : "Add Supplier"}

</h2>

<input
placeholder="Supplier Name"
value={formData.name}
onChange={(e)=>
setFormData({
...formData,
name:e.target.value
})
}
/>

<input
placeholder="Contact Person"
value={formData.contact_person}
onChange={(e)=>
setFormData({
...formData,
contact_person:e.target.value
})
}
/>

<input
placeholder="Email"
value={formData.email}
onChange={(e)=>
setFormData({
...formData,
email:e.target.value
})
}
/>

<input
placeholder="Phone"
value={formData.phone}
onChange={(e)=>
setFormData({
...formData,
phone:e.target.value
})
}
/>

<input
placeholder="City"
value={formData.city}
onChange={(e)=>
setFormData({
...formData,
city:e.target.value
})
}
/>

<input
placeholder="Address"
value={formData.address}
onChange={(e)=>
setFormData({
...formData,
address:e.target.value
})
}
/>

<input
type="number"
placeholder="Avg Delivery Days"
value={formData.avg_delivery_date}
onChange={(e)=>
setFormData({
...formData,
avg_delivery_date:e.target.value
})
}
/>

<select
value={formData.status}
onChange={(e)=>
setFormData({
...formData,
status:e.target.value
})
}
>

<option value="ACTIVE">ACTIVE</option>

<option value="INACTIVE">INACTIVE</option>

</select>

<div className="modal-buttons">

<button onClick={handleSubmit}>

Save

</button>

<button onClick={()=>setShowModal(false)}>

Cancel

</button>

</div>

</div>

</div>

)}
      </main>
    </div>
  );
}
