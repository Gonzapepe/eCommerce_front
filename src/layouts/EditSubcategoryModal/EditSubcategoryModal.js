import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSubcategory,
  updateSubcategory,
} from "../../redux/reducers/subcategory/subcategory.actions";
import { fetchSubcategories } from "../../redux/reducers/subcategories/subcategories.actions";
import Spinner from "../../components/Spinner/Spinner";

const EditSubcategoryModal = ({ id, handleModal }) => {
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    name: "",
  });
  const [success, setSuccess] = useState(false);
  const { subcategory } = useSelector((state) => state.subcategory);
  const isLoading = useSelector((state) => state.subcategory.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubcategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (subcategory) {
      setFormData({
        id,
        category: subcategory.category,
        name: subcategory.name,
      });
    }
  }, [subcategory, id]);

  useEffect(() => {
    if (success) {
      dispatch(fetchSubcategories());
      handleModal();
    }
  }, [dispatch, success]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateSubcategory(formData));
    setSuccess(true);
  };

  if (isLoading) {
    return (
      <div className="absolute flex w-screen h-screen bg-black/75">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="absolute overflow-y-scroll flex w-screen h-full bg-black/75">
      <Box className="w-9/12" sx={{ mx: "auto" }}>
        <form className="m-auto" onSubmit={handleSubmit}>
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
                value={formData.category}
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
                value={formData.name}
                variant="standard"
                label="Nombre"
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleModal()}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default EditSubcategoryModal;
