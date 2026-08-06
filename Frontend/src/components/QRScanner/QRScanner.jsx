import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./QRScanner.css";
export default function QRScanner({ onScan, onClose }) {
    const scannerRef = useRef(null);
    const hasScannedRef = useRef(false);

    useEffect(() => {
        const scanner = new Html5Qrcode("qr-reader");

        scannerRef.current = scanner;

        const startScanner = async () => {
            try {
                await scanner.start(
                    {
                        facingMode: "environment"
                    },
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250
                        }
                    },
                    async (decodedText) => {

                        // Prevent multiple scans
                        if (hasScannedRef.current) {
                            return;
                        }

                        hasScannedRef.current = true;

                        console.log(
                            "QR scanned:",
                            decodedText
                        );

                        try {
                            await scanner.stop();
                        } catch (error) {
                            console.error(
                                "Scanner stop error:",
                                error
                            );
                        }

                        onScan(decodedText);
                    },
                    () => {
                        // Ignore continuous "QR not found"
                        // scan errors.
                    }
                );
            } catch (error) {
                console.error(
                    "Unable to start QR scanner:",
                    error
                );
            }
        };

        startScanner();

        return () => {
            const cleanup = async () => {
                try {
                    if (
                        scannerRef.current &&
                        scannerRef.current.isScanning
                    ) {
                        await scannerRef.current.stop();
                    }

                    scannerRef.current?.clear();
                } catch (error) {
                    console.error(
                        "QR scanner cleanup error:",
                        error
                    );
                }
            };

            cleanup();
        };
    }, [onScan]);

    return (
        <div className="qr-scanner-overlay">

            <div className="qr-scanner-modal">

                <h2>Scan Product QR</h2>

                <p>
                    Point the camera at a product QR code.
                </p>

                <div id="qr-reader" />

                <button
                    type="button"
                    onClick={onClose}
                >
                    Close Scanner
                </button>

            </div>

        </div>
    );
}