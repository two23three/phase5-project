import React from "react";
// import {Card, CardContent, Typography} from "@mui/material";

function InfoCard({title, value}){
return(
    <div className="bg-white rounded-lg shadow-lg flex justify-between items-center p-4">
        <h2>{title}</h2> <h2>{value}</h2>
    </div>
)
}
export default InfoCard