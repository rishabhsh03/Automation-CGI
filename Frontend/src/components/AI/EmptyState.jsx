import "./EmptyState.css";

export default function EmptyState({ onSuggestionClick }) {

    const suggestions = [

        "📦 Show Low Stock Products",

        "🔍 Search Product",

        "📊 Dashboard Summary",

        "🚚 Pending Orders"

    ];

    return (

        <div className="empty-state">

            <div className="robot">

                🤖

            </div>

            <h1>How can I help today?</h1>

            <p>

                Ask me anything about inventory, products,
                suppliers, purchase orders or warehouse.

            </p>

            <div className="suggestions">

                {

                    suggestions.map((item) => (

                        <button

                            key={item}

                            onClick={() => onSuggestionClick(item)}

                        >

                            {item}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}