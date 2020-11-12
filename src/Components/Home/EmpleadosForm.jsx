import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
// import { toast } from "react-toastify";

const EmpleadosForm = (props) => {

    const initialStateValues = {
        codigo: Number,
        nombre: "",
        horas: Number,
        sueldoBase: Number,
        sueldoLiquido: Number,
        isssDesc: Number,
        afpDesc: Number,
        rentaDesc: Number
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        props.addOrEditEmpleado(values);
        setValues({ ...initialStateValues });
    };

    const getEmpleadoById = async (id) => {
        const doc = await firestore.collection("Empleados").doc(id).get();
        setValues({ ...doc.data() });
    };

    useEffect(() => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues });
        } else {
            //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
            if (props.currentId !== null && props.currentId !== undefined) {
                getEmpleadoById(props.currentId);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId]);

    return (
        
        <form onSubmit={handleSubmit} className="card card-body border-primary">

            <div className="form-group input-group">
                <input
                    type="number"
                    value={values.codigo}
                    name="codigo"
                    placeholder="Ingrese codigo"
                    className="form-control"
                    onChange={handleInputChange}
                    min="1"
                    required
                />
            </div>
            <div className="form-group input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese nombre"
                    value={values.nombre}
                    name="nombre"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group input-group">
                <input
                    type="number"
                    value={values.horas}
                    name="horas"
                    placeholder="Ingrese horas"
                    className="form-control"
                    onChange={handleInputChange}
                    min="1"
                    required
                />
            </div>

            <div className="form-group input-group">
            <button className="btn btn-primary btn-block">
                {props.currentId === "" ? "Guardar" : "Actualizar"}
            </button>
            </div>
        </form>
    );
};

export default EmpleadosForm;