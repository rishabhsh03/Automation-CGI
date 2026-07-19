import { useEffect, useState } from "react";
import "./Warehouse.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
export default function Warehouse() {

    const [warehouses, setWarehouses] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetch("http://localhost:8000/api/warehouses")
            .then(res => res.json())
            .then(result => {
                if(result.success){
                    setWarehouses(result.data);
                }
            });

    }, []);

    const filtered = warehouses.filter((item)=>

        item.name.toLowerCase().includes(search.toLowerCase()) ||

        item.address.toLowerCase().includes(search.toLowerCase())

    );

    return(

        <div className="warehouse-container">

            <Sidebar/>

            <main className="warehouse-content">

                <Navbar/>

                <div className="warehouse-header">

                    <h1>Warehouses</h1>

                    <button className="add-btn">
                        + Add Warehouse
                    </button>

                </div>

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search warehouse..."
                />

                <table className="warehouse-table">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Address</th>
                            <th>Locations</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map((warehouse)=>(

                            <tr key={warehouse.id}>

                                <td>{warehouse.name}</td>

                                <td>{warehouse.address}</td>

                                <td>{warehouse.locations}</td>

                                <td>{warehouse.items}</td>

                                <td>

                                    <span className="active">

                                        Active

                                    </span>

                                </td>

                                <td>

                                    <button className="view-btn">
                                        View
                                    </button>

                                    <button className="edit-btn">
                                        Edit
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </main>

        </div>

    );

}