from flask import Flask, request, jsonify
from flask_cors import CORS
from app.rodamientos.get import *
from app.rodamientos.post import *
from app.rodamientos.delete import *


app = Flask(__name__)
CORS(app)

# GET

@app.route('/rodamiento/<id_rodamiento>/<cantidad>', methods=['GET'])
def get_rodamiento(id_rodamiento,cantidad):
    # Obtener la cantidad de valores de amplitud del cuerpo de la solicitud JSON
    # cantidad = request.json.get('cantidad', 10)  # Por defecto, se establece en 10 si no se proporciona en la solicitud
    limite = int(cantidad)

    # Obtener los detalles del rodamiento y devolver la respuesta
    return jsonify(obtener_detalle_rodamiento(id_rodamiento, limite))

@app.route('/rodamientos', methods=['GET'])
def get_rodamientos():
    return jsonify(obtener_lista_rodamientos())

@app.route('/rodamientos/detalle', methods=['GET'])
def get_rodamientos_detalles():
    return jsonify(obtener_lista_detallada_rodamientos())

# POST

@app.route('/rodamiento', methods=['POST'])
def subir_amplitudes():
    # Verifica si se proporciona la ruta de la carpeta
    if 'ruta_carpeta' not in request.json:
        return jsonify({"error": "Se requiere la ruta de la carpeta"}), 400
    
    # Obtiene la ruta de la carpeta desde la solicitud JSON
    ruta_carpeta = request.json['ruta_carpeta']
    
    # Sube los datos de amplitud desde la carpeta proporcionada
    return subir_datos_de_amplitud(ruta_carpeta)

@app.route('/guardar_rodamiento', methods=['POST'])
def guardar_rodamiento():
    rodamiento = request.json
    if rodamiento:
        mensaje, status_code = guardar_rodamiento_en_base_de_datos(rodamiento)
        return jsonify({"mensaje": mensaje}), status_code
    else:
        return jsonify({"error": "Datos de rodamiento no proporcionados"}), 400


@app.route('/generar_rodamiento_aleatorio', methods=['GET'])
def generar_rodamiento_endpoint():
    rodamiento_aleatorio = generar_rodamiento_aleatorio()
    
    # Guardar el rodamiento aleatorio en la base de datos
    conexion = conectar_base_datos()
    guardar_rodamiento_en_base_de_datos(rodamiento_aleatorio)
    desconectar_base_datos(conexion)
    
    return rodamiento_aleatorio

@app.route('/generar_amplitud_aleatoria', methods=['GET'])
def generar_amplitud_endpoint():
    # Llamada a la función para generar y guardar datos aleatorios
    generar_amplitud_aleatoria()
    
    return "Datos de amplitud generados y guardados en la base de datos."

# DELETE

@app.route('/rodamiento/<id_rodamiento>', methods=['DELETE'])
def delete_rodamiento(id_rodamiento):
    return eliminar_rodamiento(id_rodamiento)

if __name__ == '__main__':
    app.run(debug=True)