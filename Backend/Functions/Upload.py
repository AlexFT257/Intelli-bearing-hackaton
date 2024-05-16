import pyodbc

#Credenciales de la BD
def conectDB():
    server = 'localhost'
    database = 'DB'
    username = 'user'
    password = 'password'
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    return cnxn
    