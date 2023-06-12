import React, { useState, useRef } from "react";
import DashboardSidebar from "../../layouts/DashboardSidebar/DashboardSidebar";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addSubcategory } from "../../redux/reducers/subcategory/subcategory.actions";
import { useNavigate } from "react-router-dom";

const AddSubcategory = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSubcategory(formData));
    formRef.current.reset();
    setFormData({});
  };

  const handleCancel = (e) => {
    e.preventDefault();
    formRef.current.reset();
    setFormData({});
    navigate("/dashboard");
  };
  return (
    <div className=" h-screen flex flex-row ">
      <aside className="w-3/12">
        <DashboardSidebar />
      </aside>
      <Box className="w-9/12" sx={{ mx: "auto" }}>
        <form className="m-auto" ref={formRef} onSubmit={handleSubmit}>
          <Card sx={{ mt: 10, maxWidth: 300, mx: "auto", padding: 2 }}>
            <Typography
              variant="h5"
              sx={{ mt: 2, fontWeight: "bold" }}
              color="text.secondary"
              gutterBottom
            >
              Añadir Subcategoría
            </Typography>
            {/* Categoría */}
            <div className="mt-3 flex flex-col">
              <label for="category" className="font-semibold text-base">
                Categoría
              </label>
              <select
                onChange={(e) => handleChange(e)}
                name="category"
                id="category"
                className="mt-2 w-30 text-center border p-1 rounded"
              >
                <option value={null}>Elegir categoría</option>
                <option value={"muebles"}>Muebles</option>
                <option value={"pisos"}>Pisos</option>
                <option value={"sanitarios"}>Sanitarios</option>
                <option value={"cocina"}>Cocina</option>
                <option value={"accesorios"}>Accesorios</option>
                <option value={"pinturas"}>Pinturas</option>
              </select>
            </div>
            <CardContent>
              <TextField
                variant="standard"
                label="Nombre"
                onChange={(e) => handleChange(e)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={(e) => handleCancel(e)}
              >
                Limpiar
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default AddSubcategory;
