import "./Navbar.css";

export default function Navbar() {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 17
            ? "Good Afternoon"
            : "Good Evening";

    return (

        <header className="navbar">

            <div className="navbar-left">

                <h1>

                    {greeting},

                    <span> Rishabh 👋</span>

                </h1>

                <p>
                    Warehouse Management Dashboard
                </p>

            </div>

            <div className="navbar-right">

                <div className="profile">

                    <img
                        src="https://ui-avatars.com/api/?name=Rishabh&background=22c55e&color=fff"
                        alt="profile"
                    />

                    <div>

                        <h4>Rishabh</h4>

                        <span>Administrator</span>

                    </div>

                </div>

            </div>

        </header>

    );

}