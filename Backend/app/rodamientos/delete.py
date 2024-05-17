import pyodbc

def conectar():
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
        print(f"Error al cerrar la conexión: {e}")

def eliminar_rodamiento(id_rodamiento):
    # Establecer la conexión con la base de datos
    conexion, cursor = conectar()

    try:
        # Verificar si el rodamiento existe
        cursor.execute("SELECT * FROM Rodamiento WHERE ID_Rodamiento = ?", (id_rodamiento,))
        rodamiento = cursor.fetchone()
        if not rodamiento:
            return {"error": "Rodamiento no encontrado"}, 404

        # Eliminar el rodamiento por su ID
        cursor.execute("DELETE FROM Rodamiento WHERE ID_Rodamiento = ?", (id_rodamiento,))
        conexion.commit()

        return {"mensaje": "Rodamiento eliminado exitosamente"}, 200
    except pyodbc.Error as ex:
        print("Error al eliminar el rodamiento:", ex)
        return {"error": "Error al eliminar el rodamiento"}, 500
    finally:
        desconectar(conexion, cursor)