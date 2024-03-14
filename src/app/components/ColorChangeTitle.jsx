"use client"
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Asegúrate de tener la importación correcta según tu configuración.

const ColorChangingTitle = () => {
    const [color, setColor] = useState('text-blue-500'); // Inicializado con el color inicial

    useEffect(() => {
        // Cambia de color cada 2 segundos
        const interval = setInterval(() => {
            setColor(color === 'text-blue-500' ? 'text-red-500' : 'text-blue-500');
        }, 2000);

        return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
    }, [color]);

    return (
        <h1 className={` mt-10 text-6xl font-bold ${color}`}>
            Bienvenido a tu aplicación de gestión de tareas en Next.js
        </h1>
    );
};

export default ColorChangingTitle;