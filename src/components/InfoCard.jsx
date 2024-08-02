import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

function InforCard({title, value}){
return(
    <Card>
        <CardContent>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2">
                {value}
            </Typography>
        </CardContent>
    </Card>
)
}
export default InforCard