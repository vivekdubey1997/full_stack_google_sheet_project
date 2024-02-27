import React,{useState,useEffect} from "react";
import "./style.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import axios from "axios";


export default function MuiCard() {

  const [responseData, setResponseData] = useState([]);

  
  useEffect(() => {
   
    const fetchData = async () => {
      try {
      
        const response = await axios.get('http://localhost:3000/');
      
        setResponseData(response.data);
        console.log(response.data)
      } catch (error) {
       
        console.error('Error fetching data:', error);
      }
    };
        
        fetchData();

      
        return () => {
        
        };
      }, []); 
    
    


  return (
    <div className="card-container">
    {
      responseData.map((data, index)=>(
        <Card key={index} sx={{ maxWidth: 340, cursor: "pointer", minWidth: 250}} className="card">
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              style={{ fontSize: "12px"    }}
            >
              {data.Symbol}
            </Avatar>
          }
          action={data.Type}
          title={data.CompanyName}
          subheader={data.Date}
        />
        <CardMedia
          component="div"
          style={{
            minHeight: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <p>
            <strong>Last Traded Price:</strong> {data.LTP}
          </p>
          <p>
            <strong>Target Price:</strong> {data.TargetPrice}
          </p>
          <p>
            <strong>Stop Loss Price:</strong> {data.StopLossPrice}
          </p>{" "}
        </CardMedia>
        <CardContent style={{ backgroundColor: "#63bbd8", outline: "none", border: "none" }}>
          <Typography variant="body2" color="text.primary">
            {data.Description}
          </Typography>
        </CardContent>
      </Card>
      ))
    }
    </div>
   
  );
}
