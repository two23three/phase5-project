import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

function InforCard({title, value}){
return(
    <div className="bg-white rounded-lg shadow-lg">
        <h2>{title}</h2> <h2>{value}</h2>
    </div>
)
}
export default InforCard