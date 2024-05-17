CREATE TABLE Rodamiento (
    ID_Rodamiento VARCHAR(100) PRIMARY KEY,
    last_state VARCHAR(20),
    Nombre_Rodamiento VARCHAR(100),
    Fecha_Instalacion DATE,
    Tipo VARCHAR(100),
    Fabricante VARCHAR(100),
    Modelo VARCHAR(100),
    Peso DECIMAL(10, 2),
    N_Bolas INT,
    Diametro_Agujero INT,
    Diametro_Exterior INT,
    Ancho INT,
    Costo_de_unidad FLOAT,
    Velocidad_Limite INT,
    Temp FLOAT,
    Torque FLOAT
);

-- Tabla Lectura_Amplitud
CREATE TABLE Lectura_Amplitud (
    ID_Lectura INT IDENTITY(1,1) PRIMARY KEY,
    ID_Rodamiento VARCHAR(100),
    Fecha DATETIME
);

-- Tabla Amplitud
CREATE TABLE Amplitud (
    ID_Amplitud INT IDENTITY(1,1) PRIMARY KEY,
    ID_Lectura INT,
    Amplitud FLOAT,
    Hz FLOAT,
    FOREIGN KEY (ID_Lectura) REFERENCES Lectura_Amplitud(ID_Lectura)
);

-- Tabla Espectrograma
CREATE TABLE Espectrograma (
    ID_Espectrograma VARCHAR(100) PRIMARY KEY,
    ID_Lectura INT,
    Espectrograma VARBINARY(MAX),
    FOREIGN KEY (ID_Lectura) REFERENCES Lectura_Amplitud(ID_Lectura)
);


DROP TABLE Espectrograma;
DROP TABLE Amplitud;
DROP TABLE Lectura_Amplitud;
DROP TABLE Rodamiento;


DELETE FROM Amplitud;
DELETE FROM Lectura_Amplitud;
DELETE FROM Rodamiento;


SELECT * FROM Lectura_Amplitud;
SELECT * FROM Rodamiento;
SELECT * FROM Amplitud;

SELECT TOP 1 * FROM Lectura_Amplitud WHERE ID_Rodamiento = '0834732d-6a43-4f21-888b-7610d89884be' ORDER BY Fecha DESC