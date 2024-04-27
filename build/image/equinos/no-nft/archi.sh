#!/bin/bash

# Ruta de la imagen original
input_image="90016.png"

# Bucle para crear imágenes numeradas
for i in {90015..90500}
do
    # Nombre de archivo para la imagen de salida
    output_image="${i}.png"
    
    # Copiar la imagen original a una nueva con un nuevo nombre
    cp "$input_image" "$output_image"
done



