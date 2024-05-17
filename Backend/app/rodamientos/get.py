import pyodbc 
from datetime import datetime

def conectar ():
    servidor = 'NTTD-32HT4D3\\SQLEXPRESS'
    base_datos = 'Intelli-Bearing'
    usuario = 'Ale'
    contrasena = '1234'

    try:
        conexion = pyodbc.connect(f'DRIVER={{SQL Server}};SERVER={servidor};DATABASE={base_datos};UID={usuario};PWD={contrasena}')
        cursor = conexion.cursor()
        return conexion, cursor
    except pyodbc.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None, None

def desconectar(conexion, cursor):
    try:
        if cursor:
            cursor.close()
        if conexion:
            conexion.close()
        print("Conexión cerrada correctamente.")
    except pyodbc.Error as e:
        print(f"Error al cerrar la conexión: {e}.")

def obtener_detalle_rodamiento(id_rodamiento, cantidad):
    conexion, cursor = conectar()

    if not conexion or not cursor:
        return {"error": "Error de conexión a la BDD"}, 500
    
    try:
        cursor.execute("SELECT * FROM Rodamiento WHERE ID_Rodamiento = ?", (id_rodamiento,))
        rodamiento = cursor.fetchone()

        if not rodamiento:
            return{"Error": "Rodamiento no encontrado"}, 404
        
        cursor.execute("SELECT TOP 1 * FROM Lectura_Amplitud WHERE ID_Rodamiento = ? ORDER BY Fecha DESC", (id_rodamiento,))
        ultima_lectura = cursor.fetchone()

        if not ultima_lectura:
            return{"Error": "No se han encontrado lecturas para este rodamiento"}, 404

        cursor.execute("SELECT TOP (?) Amplitud, Hz FROM Amplitud WHERE ID_Lectura = ? ORDER BY ID_Amplitud DESC", (cantidad, ultima_lectura[0]))
        ultimos_valores_amplitud = cursor.fetchall()

        # Inicializar listas vacías para almacenar valores de x e y
        x_values = []
        y_values = []
        
        # Llenar las listas de x e y con los valores de ultimos_valores_amplitud
        for valor in ultimos_valores_amplitud:
            x_values.append(float(valor[1]))  # Hz como x
            y_values.append(float(valor[0]))  # Amplitud como y

        # Formatear la fecha de fabricación
        fecha_fabricacion = datetime.strptime(rodamiento[3], '%Y-%m-%d') if rodamiento[3] else None

        # Formatear los resultados
        detalle_rodamiento = {
            "ID_Rodamiento": rodamiento[0],
            "last_state": rodamiento[1],
            "Nombre_Rodamiento": rodamiento[2],
            "Fecha_Instalacion": fecha_fabricacion,
            "Tipo": rodamiento[4],
            "Fabricante": rodamiento[5],
            "Modelo": rodamiento[6],
            "Peso": float(rodamiento[7]),
            "N_Bolas": int(rodamiento[8]),
            "Diametro_Agujero": int(rodamiento[9]),
            "Diametro_Exterior": int(rodamiento[10]),
            "Ancho": int(rodamiento[11]),
            "Costo_de_unidad": float(rodamiento[12]),
            "Velocidad_Limite": int(rodamiento[13]),
            "Temp": float(rodamiento[14]),
            "Torque": float(rodamiento[15]),
            "Ultima_Lectura": {
                "ID_Lectura": ultima_lectura[0],
                "Fecha": ultima_lectura[2].strftime('%Y-%m-%d %H:%M:%S')
            },
            "data": {"x": x_values, "y": y_values}
        }

        return detalle_rodamiento, 200

    except pyodbc.Error as e:
        print(f"Error de base de datos: {e}")
        return {"error": "Error de base de datos"}, 500

    finally:
        desconectar(conexion, cursor)

def obtener_lista_rodamientos():
    # Establecer la conexión con la base de datos
    conexion, cursor = conectar()

    if not conexion or not cursor:
        return {"error": "Error de conexión a la base de datos"}, 500

    try:
        # Consultar los rodamientos en la base de datos
        cursor.execute("SELECT ID_Rodamiento, Nombre_Rodamiento, Fecha_Instalacion, last_state,N_Bolas FROM Rodamiento")
        #FECHA INSTALACION, ULTIMO ESTADO, ESTIMACION DE TIEMPO DE VIDA
        rodamientos = cursor.fetchall()

        # Formatear los resultados
        lista_rodamientos = [{"ID_Rodamiento": rodamiento[0], "Nombre_Rodamiento": rodamiento[1], "Fecha_Instalacion": rodamiento[2], "Ultimo_Estado":rodamiento[3], "Estimacion_Vida": rodamiento[4] } for rodamiento in rodamientos]

        return lista_rodamientos, 200

    except pyodbc.Error as e:
        print(f"Error de base de datos: {e}")
        return {"error": "Error de base de datos"}, 500

    finally:
        desconectar(conexion, cursor)


def obtener_lista_detallada_rodamientos():
    # Establecer la conexión con la base de datos
    conexion, cursor = conectar()

    if not conexion or not cursor:
        return {"error": "Error de conexión a la base de datos"}, 500

    try:
        # Consultar todos los detalles de los rodamientos en la base de datos
        cursor.execute("SELECT * FROM Rodamiento")
        rodamientos = cursor.fetchall()

        # Formatear los resultados
        lista_rodamientos = []
        for rodamiento in rodamientos:
            detalle_rodamiento = {
                "ID_Rodamiento": rodamiento[0],
                "last_state": rodamiento[1],
                "Nombre_Rodamiento": rodamiento[2],
                "Tipo": rodamiento[3],
                "Fabricante": rodamiento[4],
                "Modelo": rodamiento[5],
                "Peso": float(rodamiento[6]),
                "N_Bolas": int(rodamiento[7]),
                "Diametro_Agujero": int(rodamiento[8]),
                "Diametro_Exterior": int(rodamiento[9]),
                "Ancho": int(rodamiento[10]),
                "Costo_de_unidad": float(rodamiento[11]),
                "Velocidad_Limite": int(rodamiento[12]),
                "Temp": float(rodamiento[13]),
                "Torque": float(rodamiento[14])
            }
            lista_rodamientos.append(detalle_rodamiento)

        return lista_rodamientos, 200

    except pyodbc.Error as e:
        print(f"Error de base de datos: {e}")
        return {"error": "Error de base de datos"}, 500

    finally:
        desconectar(conexion, cursor)

        
