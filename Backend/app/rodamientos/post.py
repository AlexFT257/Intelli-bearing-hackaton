import os
import pyodbc
import uuid
from datetime import datetime, timedelta
import random
from flask import jsonify
import threading


def generar_id_unico():
    return str(uuid.uuid4())

def generar_datos_rodamiento_aleatorios(nombre_carpeta):
    # Generar datos aleatorios para el rodamiento
    return {
        "ID_Rodamiento": generar_id_unico(),
        "Nombre_Rodamiento": nombre_carpeta,
        "Tipo": "Tipo " + random.choice(["A", "B", "C"]),
        "Fabricante": "Fabricante " + random.choice(["X", "Y", "Z"]),
        "Modelo": "Modelo " + str(random.randint(100, 999)),
        "Fecha_Instalacion": datetime(random.randint(1980, 2024), random.randint(1, 12), random.randint(1, 28)),
        "Peso": round(random.uniform(1.0, 100.0), 2),
        "N_Bolas": random.randint(1, 100),
        "Diametro_Bolas": random.randint(1, 100),
        "Diametro_Agujero": random.randint(1, 100),
        "Diametro_Exterior": random.randint(1, 100),
        "Ancho": random.randint(1, 100),
        "Diametro_del_Resalte": random.randint(1, 100),
        "Diametro_del_Rebaje": random.randint(1, 100),
        "Dimension_del_chaflan": random.randint(1, 100),
        "Capacidad_Carga_Dinamica_Basica": round(random.uniform(1.0, 100.0), 2),
        "Capacidad_Carga_Estatica_Basica": round(random.uniform(1.0, 100.0), 2),
        "Carga_Limite_Fatiga": round(random.uniform(1.0, 100.0), 2),
        "Velocidad_Referencia": random.randint(1, 100),
        "Velocidad_Limite": random.randint(1, 100),
        "Factor_Carga_Minima": round(random.uniform(1.0, 100.0), 2),
        "Factor_Calculo": random.randint(1, 100),
        "Clase_Tolerancia_Dimensionales": random.choice(["P6", "P5"]),
        "Desviacion_Radial": random.choice(["Alta", "Media", "Baja"]),
        "last_state_id": 1,
        "last_state": random.randint(0, 3)
    }

def conectar_base_datos():
    try:
        servidor = 'NTTD-32HT4D3\\SQLEXPRESS'
        base_datos = 'Intelli-Bearing'
        usuario = 'Ale'
        contrasena = '1234'
        conexion = pyodbc.connect(f'DRIVER={{SQL Server}};SERVER={servidor};DATABASE={base_datos};UID={usuario};PWD={contrasena}')
        print("Conexión exitosa.")
        return conexion
    except pyodbc.Error as ex:
        print("Error al conectar a la base de datos:", ex)
        return None

def desconectar_base_datos(conexion):
    try:
        conexion.close()
        print("Desconexión exitosa.")
    except pyodbc.Error as ex:
        print("Error al desconectar de la base de datos:", ex)




def guardar_rodamiento_en_base_de_datos(rodamiento):
    try:
        conexion = conectar_base_datos()
        cursor = conexion.cursor()
        # Insertar en la tabla Rodamiento
        cursor.execute("""
            INSERT INTO Rodamiento (
                ID_Rodamiento, Nombre_Rodamiento, Tipo, Fabricante, Modelo, Fecha_Instalacion,
                Peso, N_Bolas, Diametro_Agujero, Diametro_Exterior, Ancho,
                Velocidad_Limite, last_state, Temp, Torque, Costo_de_unidad
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            rodamiento["ID_Rodamiento"],
            rodamiento["Nombre_Rodamiento"],
            rodamiento["Tipo"],
            rodamiento["Fabricante"],
            rodamiento["Modelo"],
            rodamiento["Fecha_Instalacion"],
            rodamiento["Peso"],
            rodamiento["N_Bolas"],
            rodamiento["Diametro_Agujero"],
            rodamiento["Diametro_Exterior"],
            rodamiento["Ancho"],
            rodamiento["Velocidad_Limite"],
            rodamiento["last_state"],
            rodamiento["Temp"],
            rodamiento["Torque"],
            rodamiento["Costo_de_unidad"]
        ))
        
        conexion.commit()
        print("Rodamiento guardado en la base de datos.")
    except pyodbc.Error as ex:
        print("Error al guardar rodamiento en la base de datos:", ex)
    finally:
        desconectar_base_datos(conexion)

def generar_rodamiento_aleatorio():
    # Generar datos aleatorios para el rodamiento
    rodamiento = {
        "ID_Rodamiento": random.randint(1, 1000),
        "Nombre_Rodamiento": "Rodamiento_" + str(random.randint(1, 100)),
        "Tipo": random.choice(["Tipo1", "Tipo2", "Tipo3"]),
        "Fabricante": "Fabricante_" + str(random.randint(1, 50)),
        "Modelo": "Modelo_" + str(random.randint(1, 20)),
        "Fecha_Instalacion": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "Peso": random.uniform(0.1, 10.0),
        "N_Bolas": random.randint(1, 20),
        "Diametro_Agujero": random.uniform(1.0, 10.0),
        "Diametro_Exterior": random.uniform(10.0, 50.0),
        "Ancho": random.uniform(5.0, 20.0),
        "Velocidad_Limite": random.randint(100, 1000),
        "last_state": random.choice(["Bueno", "Regular", "Malo"]),
        "Temp": random.uniform(20.0, 100.0),
        "Torque": random.uniform(0.1, 10.0),
        "Costo_de_unidad": random.uniform(50.0, 500.0)
    }

    return rodamiento

def guardar_amplitud_en_base_de_datos(id_lectura, amplitud, hz):
    try:
        conexion = conectar_base_datos()
        cursor = conexion.cursor()

        # Insertar en la tabla Amplitud
        cursor.execute("""
            INSERT INTO Amplitud (ID_Lectura, Amplitud, Hz)
            VALUES (?, ?, ?)
        """, (id_lectura, amplitud, hz))
        
        conexion.commit()
        print("Amplitud guardada en la base de datos.")
    except pyodbc.Error as ex:
        print("Error al guardar amplitud en la base de datos:", ex)
    finally:
        desconectar_base_datos(conexion)

def generar_amplitud_aleatoria():
    try:
        conexion = conectar_base_datos()
        cursor = conexion.cursor()

        # Obtener la lista de rodamientos en la base de datos
        cursor.execute("SELECT ID_Rodamiento FROM Rodamiento")
        rodamientos = cursor.fetchall()

        for rodamiento in rodamientos:
            id_rodamiento = rodamiento[0]

            # Generar datos para Lectura_Amplitud
            fecha = datetime.now() - timedelta(days=random.randint(0, 365),
                                                 hours=random.randint(0, 23),
                                                 minutes=random.randint(0, 59),
                                                 seconds=random.randint(0, 59))

            # Insertar en la tabla Lectura_Amplitud
            cursor.execute("""
                INSERT INTO Lectura_Amplitud (ID_Rodamiento, Fecha)
                VALUES (?, ?)
            """, (id_rodamiento, fecha))
            conexion.commit()

            # Obtener el ID_Lectura recién insertado
            cursor.execute("SELECT @@IDENTITY")
            id_lectura = cursor.fetchone()[0]

            # Generar datos para Amplitud (20 datos)
            for _ in range(20):
                amplitud = random.uniform(0.1, 10.0)
                hz = random.uniform(1.0, 100.0)  # Rango de Hz arbitrario

                guardar_amplitud_en_base_de_datos(id_lectura, amplitud, hz)

        print("Datos de amplitud generados y guardados en la base de datos.")
    except pyodbc.Error as ex:
        print("Error:", ex)
    finally:
        desconectar_base_datos(conexion)
def procesar_archivo_de_amplitudes(ruta_archivo, ID_Rodamiento):
    try:
        # Extraer la fecha del nombre del archivo
        nombre_archivo = os.path.basename(ruta_archivo)
        nombre_carpeta = os.path.basename(os.path.dirname(ruta_archivo))  # Obtener el nombre de la carpeta que contiene el archivo
        
        # Dividir la cadena del nombre del archivo para obtener la fecha y hora
        partes_nombre = nombre_archivo.split('.')
        if len(partes_nombre) >= 6:  # Asegurar que hay suficientes partes para contener la fecha
            fecha_str = '.'.join(partes_nombre[:6])  # Tomar los primeros seis elementos como la cadena de fecha
            fecha_components = fecha_str.split('.')  # Dividir la cadena de fecha en sus componentes

            # Verificar si hay suficientes componentes para construir la fecha
            if len(fecha_components) == 6:
                # Construir la fecha y hora a partir de los componentes
                fecha = datetime(int(fecha_components[0]), int(fecha_components[1]), int(fecha_components[2]),
                                 int(fecha_components[3]), int(fecha_components[4]), int(fecha_components[5]))

                with open(ruta_archivo, 'r') as archivo:  # Abrir el archivo en modo texto
                    contenido = archivo.read()  # Leer el contenido del archivo
                    # Guardar las amplitudes en la base de datos
                    guardar_amplitudes_en_base_de_datos(contenido, fecha, ID_Rodamiento)
                    
                return fecha, nombre_carpeta
            else:
                print("Error: El formato de la cadena de fecha es incorrecto.")
                return None, None
        else:
            print("Error: El nombre del archivo no tiene el formato esperado.")
            return None, None
    except Exception as e:
        print(f"Error al procesar el archivo: {e}")
        return None, None

def subir_datos_de_amplitud(ruta_carpeta):
    try:
        # Generar un único rodamiento para la carpeta
        nombre_carpeta = os.path.basename(ruta_carpeta)
        rodamiento = generar_datos_rodamiento_aleatorios(nombre_carpeta)
        guardar_rodamiento_en_base_de_datos(rodamiento)

        # Procesar cada archivo de amplitud en un hilo separado
        archivos = os.listdir(ruta_carpeta)
        threads = []
        for archivo in archivos:
            ruta_archivo = os.path.join(ruta_carpeta, archivo)
            thread = threading.Thread(target=procesar_archivo_de_amplitudes, args=(ruta_archivo, rodamiento["ID_Rodamiento"]))
            threads.append(thread)
            thread.start()

        # Esperar a que todos los hilos terminen
        for thread in threads:
            thread.join()

        return jsonify({"message": "Datos de amplitud subidos correctamente"}), 200
    except Exception as e:
        print(f"Error al subir datos de amplitud: {e}")
        return jsonify({"error": "Error al subir datos de amplitud"}), 500