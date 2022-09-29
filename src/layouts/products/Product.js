import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const Product = ({ id, path, title, price, subcategories, onClick }) => {
  const navigate = useNavigate();
  if (onClick) {
    navigate(`/product/${id}`);
  }
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 300,
        minHeight: 350,
        maxHeight: 350,
        overflow: "hidden",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        flexWrap: "wrap",
        alignSelf: "normal",
        cursor: "pointer",
        marginTop: "25px",
      }}
      key={id}
    >
      <CardMedia
        sx={{ minHeight: 200 }}
        component="img"
        height="200"
        image={`http://localhost:4000/${path}`}
        alt={title}
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h5"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {" "}
          {title}{" "}
        </Typography>
        <Typography component="p"> $ {price} </Typography>
        <Typography variant="body2" color="text.secondary">
          {subcategories
            ? subcategories.map((subcategory) => {
                return <p> {subcategory.name} </p>;
              })
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
