import { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

function Generator() {
    const [text, setText] = useState('');
    const [showCanvas, setShowCanvas] = useState(false);
    const [platform, setPlatform] = useState(''); // New state for dropdown selection
    const canvasRef = useRef(null);

    const handleGenerate = () => {
        setShowCanvas(true);

        setTimeout(() => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                
                // Set canvas background color to black
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Determine color based on platform selection
                let color;
                if (platform === 'HackerRank') color = '#00FF00';
                else if (platform === 'Codewars') color = '#FF0000';
                else if (platform === 'LeetCode') color = '#FFFF00';
                else color = '#FFFFFF';

                // Set properties for the title text with platform color
                ctx.fillStyle = color;
                ctx.font = "60px monospace";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Draw the platform name as title
                const titleX = canvas.width / 2;
                const titleY = canvas.height / 2 - 200;
                ctx.fillText(platform, titleX, titleY);

                // Set properties for the main input text
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "100px monospace";
                ctx.fillText(text || platform, canvas.width / 2, canvas.height / 2);

                // Draw emojis
                ctx.font = "180px Arial";
                ctx.textAlign = "left";
                ctx.textBaseline = "bottom";
                ctx.fillText("💰", 40, canvas.height - 40);
                ctx.textAlign = "right";
                ctx.fillText("🕒", canvas.width - 40, canvas.height - 40);
            }
        }, 0);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'generated-thumbnail.png';
        link.click();
    };

    const handlePlatformChange = (e) => {
        const selectedPlatform = e.target.value;
        setPlatform(selectedPlatform);
        setText(selectedPlatform); // Update main text based on selection
    };

    return (
        <div className="flex flex-col items-center justify-start w-full pt-4">
            <div className="flex flex-col w-full max-w-3xl px-4">
                <p className="text-fuchsia-300 mb-2">Generate Thumbnails Effortlessly</p>
                <div className="flex w-full mb-4">
                    <div className="flex items-center w-full input input-bordered pr-0">
                        <FaSearch className="text-gray-500 ml-2 mr-2" />
                        <input
                            type="text"
                            placeholder="Type here"
                            className="w-full border-none outline-none"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <select
                        className="ml-2 px-4 py-2 border rounded"
                        value={platform}
                        onChange={handlePlatformChange}
                    >
                        <option value="">Select Platform</option>
                        <option value="HackerRank">HackerRank</option>
                        <option value="Codewars">Codewars</option>
                        <option value="LeetCode">LeetCode</option>
                    </select>
                    <button className="btn btn-success ml-2" onClick={handleGenerate}>Generate</button>
                </div>
            </div>

            {showCanvas && (
                <div className="flex flex-col items-center mt-4">
                    <canvas ref={canvasRef} width={1280} height={720} className="border-2 border-gray-300" />
                    <button className="btn btn-primary mt-4" onClick={handleDownload}>Download</button>
                </div>
            )}
        </div>
    );
}

export default Generator;
