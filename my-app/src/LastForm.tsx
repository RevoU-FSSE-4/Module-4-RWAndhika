import React from "react";
import { useState } from "react";


interface LastFormProps {
    onBack: () => void;
}

const LastForm: React.FC<LastFormProps> = ({ onBack })=> {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {

    };

    const handleBack = () => {
        onBack();
    };



    return (
        <div>
            <h2>Account Information</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default LastForm;