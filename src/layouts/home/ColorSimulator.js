import React from 'react';

import cSimProducto from '../../assets/images/csim-producto.png';
import cSimSuperficie from '../../assets/images/csim-superficie.png';
import cSimTendencia from '../../assets/images/csim-tendencia.png';

const listOfcSim = [
    {
        title: 'Colores por Producto',
        image: cSimProducto
    },
    {
        title: 'Colores por Superficie',
        image: cSimSuperficie
    },
    {
        title: 'Colores por Tendencia',
        image: cSimTendencia
    }
];


const ColorSimulator = () => (
    <>
        <div id="color_simulator_container" className="w-full p-2 m-auto mt-10 md:max-w-6xl">
            <h1 className="uppercase text-slate-400	font-normal text-2xl my-4" id="categoriesTitle">
                Simulador de Colores
            </h1>

            <div id="color_simulator_list" className="w-full m-auto gap-4 grid grid-rows-3">
                {
                    listOfcSim.map((data, index) => {
                        return  (
                            <div key={index} className="flex w-full h-full relative justify-center items-center">
                                <h3 className="uppercase text-base md:text-2xl text-white absolute z-10">{data.title}</h3>
                                <img src={data.image} className="w-full" alt="category pic"/>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    </>
);


export default ColorSimulator;