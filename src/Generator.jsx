import { useState, useRef } from 'react';
import { FaQuestion } from 'react-icons/fa';

function Generator() {
    const [text, setText] = useState('');
    const [showCanvas, setShowCanvas] = useState(false);
    const [platform, setPlatform] = useState('');
    const [leftEmoji, setLeftEmoji] = useState('');
    const [rightEmoji, setRightEmoji] = useState('');
    const canvasRef = useRef(null);

    const handleGenerate = () => {
        setShowCanvas(true);
        setTimeout(() => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                let color;
                if (platform === 'HackerRank') color = '#00FF00';
                else if (platform === 'Codewars') color = '#FF0000';
                else if (platform === 'LeetCode') color = '#FFFF00';
                else color = '#FFFFFF';

                ctx.fillStyle = color;
                ctx.font = "60px monospace";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                const titleX = canvas.width / 2;
                const titleY = canvas.height / 2 - 200;
                ctx.fillText(platform, titleX, titleY);

                ctx.fillStyle = "#FFFFFF";
                ctx.font = "100px monospace";
                ctx.fillText(text || platform, canvas.width / 2, canvas.height / 2);

                ctx.font = "180px Arial";
                ctx.textAlign = "left";
                ctx.textBaseline = "bottom";
                ctx.fillText(leftEmoji || ' ', 40, canvas.height - 40);
                ctx.textAlign = "right";
                ctx.fillText(rightEmoji || ' ', canvas.width - 40, canvas.height - 40);
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
        setText(selectedPlatform);
    };

    return (
        <div className="flex flex-col items-center justify-start w-full pt-4">
            <div className="flex flex-col w-full max-w-3xl px-4">
                <p className="text-white mb-2 text-center text-3xl sm:text-4xl">Generate Thumbnails Effortlessly</p>
                <div className="flex flex-wrap w-full mb-4 items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center w-full sm:w-auto input input-bordered pr-0 flex-grow">
                        <FaQuestion className="text-gray-500 ml-2 mr-2" />
                        <input
                            type="text"
                            placeholder="Enter Question Name"
                            className="w-full border-none outline-none"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <select
                        className="w-full sm:w-auto px-2 py-1 border rounded"
                        value={platform}
                        onChange={handlePlatformChange}
                    >
                        <option value="">Select Platform</option>
                        <option value="HackerRank">HackerRank</option>
                        <option value="Codewars">Codewars</option>
                        <option value="LeetCode">LeetCode</option>
                    </select>
                    <input
                        type="text"
                        placeholder="L"
                        className="w-16 text-center input input-bordered"
                        value={leftEmoji}
                        onChange={(e) => setLeftEmoji(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="R"
                        className="w-16 text-center input input-bordered"
                        value={rightEmoji}
                        onChange={(e) => setRightEmoji(e.target.value)}
                    />
                    <button className="btn btn-success px-4 w-full sm:w-auto" onClick={handleGenerate}>Generate</button>
                </div>
            </div>

            {showCanvas && (
                <div className="flex flex-col items-center mt-4 w-full px-4">
                    <canvas ref={canvasRef} width={1280} height={720} className="w-full max-w-full h-auto border-2 border-gray-300" />
                    <button className="btn btn-primary mt-4 w-full sm:w-auto" onClick={handleDownload}>Download</button>
                </div>
            )}
        </div>
    );
}

export default Generator;
