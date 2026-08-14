import { useEffect, useState } from "react";
import loaderGif from "../assets/warehouse-loader.gif";
import "./WarehouseLoader.css";

const loadingMessages = [
    {
        title: "Loading Warehouse",
        subtitle: "Preparing your dashboard..."
    },
    {
        title: "Fetching Inventory",
        subtitle: "Checking your current stock..."
    },
    {
        title: "Loading Orders",
        subtitle: "Getting your latest orders..."
    },
    {
        title: "Preparing Analytics",
        subtitle: "Building your warehouse insights..."
    },
    {
        title: "Almost Ready",
        subtitle: "Preparing your workspace..."
    }
];

export default function WarehouseLoader() {

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setMessageIndex((previous) =>
                (previous + 1) % loadingMessages.length
            );

        }, 1800);

        return () => clearInterval(interval);

    }, []);

    const message = loadingMessages[messageIndex];

    return (
        <div className="warehouse-loader">

            <div className="warehouse-loader-content">

                <img src={loaderGif} 
                alt="Warehouse Loader"
                className="warehouse-loader-gif"
                />

                <div className="warehouse-loader-text">

                    <h2>
                        {message.title}
                    </h2>

                    <p>
                        {message.subtitle}
                    </p>

                </div>

                <div className="warehouse-loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        </div>
    );
}