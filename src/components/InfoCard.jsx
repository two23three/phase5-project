import React from "react";

function InforCard({title, value}){
return(
    <div className="bg-white rounded-lg shadow-lg">
        <h2>{title}</h2> <h2>{value}</h2>
    </div>
)
}
export default InforCard