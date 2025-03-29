import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy} 
            className="btn btn-sm btn-ghost tooltip flex gap-2"
            data-tip="Copier le code"
        >
            {copied ? (
                <FiCheck className="text-success animate-bounce w-4 h-4" />
            ) : (
                <FiCopy className="w-4 h-4" />
            )}
            {copied ? "Copié !" : "Copier"}
        </button>
    );
};

export default CopyButton;
