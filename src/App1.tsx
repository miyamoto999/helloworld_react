import React from "react";

export const App1 = ()=>{
    const [message, setMessage] = React.useState("ボタンをおして！");

    const handleClick = () => {
        setMessage("こんにちは！");
    }
    return <div>
        <p>{message}</p>
        <p><button onClick={handleClick}>ボタン</button></p>
    </div>;
}