import "./ChatMessage.css";

export default function ChatMessage({ message }) {

    const isUser =
        message.role === "user";

    const hasData =
        Array.isArray(message.data) &&
        message.data.length > 0;


    // ==========================================
    // DETECT RESULT TYPE
    // ==========================================

    const isOrderData =
        hasData &&
        message.data.some(
            item =>
                item.customer_name !== undefined ||
                item.customer_id !== undefined
        );


    const formatCurrency = (amount) => {

        if (amount == null) {
            return "-";
        }

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR"
            }
        ).format(Number(amount));

    };


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    };


    return (

        <div
            className={`message-row ${
                isUser ? "user" : "assistant"
            }`}
        >

            <div className="avatar">
                {isUser ? "👤" : "🤖"}
            </div>


            <div className="message-content">

                {/* ==================================
                    RESPONSE TITLE
                ================================== */}

                {!isUser && message.title && (

                    <div className="message-title">
                        {message.title}
                    </div>

                )}


                {/* ==================================
                    NORMAL MESSAGE
                ================================== */}

                <div className="message-bubble">
                    {message.content}
                </div>


               {/* ==================================
    ORDER RESULTS
================================== */}

{!isUser &&
    hasData &&
    isOrderData && (

    <div className="order-results">

        {message.data.map(
            (order, index) => (

                <div
                    className="order-result-card"
                    key={order.id || index}
                >

                    {/* HEADER */}

                    <div className="order-card-header">

                        <div className="order-number">
                            Order #{order.id}
                        </div>

                        {order.status && (

                            <span
                                className={`order-status ${
                                    order.status.toLowerCase()
                                }`}
                            >
                                {order.status}
                            </span>

                        )}

                    </div>


                    {/* DETAILS */}

                    <div className="order-card-details">

                        <div className="order-detail">

                            <span className="order-label">
                                Customer
                            </span>

                            <strong>
                                {
                                    order.customer_name ||
                                    `Customer #${order.customer_id}`
                                }
                            </strong>

                        </div>


                        <div className="order-detail">

                            <span className="order-label">
                                Total
                            </span>

                            <strong>
                                {
                                    formatCurrency(
                                        order.total_amount
                                    )
                                }
                            </strong>

                        </div>


                        <div className="order-detail">

                            <span className="order-label">
                                Date
                            </span>

                            <strong>
                                {
                                    formatDate(
                                        order.created_at
                                    )
                                }
                            </strong>

                        </div>

                    </div>

                </div>

            )
        )}

    </div>

)}
                {/* ==================================
                    INVENTORY / PRODUCT RESULTS
                ================================== */}

                {!isUser &&
                    hasData &&
                    !isOrderData && (

                    <div className="ai-results">

                        {message.data.map(
                            (item, index) => (

                                <div
                                    className="ai-result-card"
                                    key={
                                        item.id ||
                                        item.product_id ||
                                        index
                                    }
                                >

                                    <div className="result-header">

                                        <strong>
                                            {
                                                item.name ||
                                                "Product"
                                            }
                                        </strong>


                                        {item.sku && (

                                            <span className="result-sku">
                                                {item.sku}
                                            </span>

                                        )}

                                    </div>


                                    <div className="result-details">

                                        {item.category && (

                                            <div>

                                                <span>
                                                    Category
                                                </span>

                                                <strong>
                                                    {item.category}
                                                </strong>

                                            </div>

                                        )}


                                        {item.available_quantity != null && (

                                            <div>

                                                <span>
                                                    Available
                                                </span>

                                                <strong>
                                                    {
                                                        item.available_quantity
                                                    }
                                                </strong>

                                            </div>

                                        )}


                                        {item.quantity != null && (

                                            <div>

                                                <span>
                                                    Quantity
                                                </span>

                                                <strong>
                                                    {item.quantity}
                                                </strong>

                                            </div>

                                        )}


                                        {item.reorder_level != null && (

                                            <div>

                                                <span>
                                                    Reorder Level
                                                </span>

                                                <strong>
                                                    {
                                                        item.reorder_level
                                                    }
                                                </strong>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}


                {/* ==================================
                    TIME
                ================================== */}

                <span className="message-time">
                    {message.time}
                </span>

            </div>

        </div>

    );

}