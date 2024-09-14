CREATE DATABASE IF NOT EXISTS TocaPastoDB;
USE TocaPastoDB;

CREATE TABLE Zona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Facultades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    id_zona INT,
    FOREIGN KEY (id_zona) REFERENCES Zona(id)
);

CREATE TABLE Carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    modalidad ENUM('Diurna', 'Vespertina') NOT NULL,
    id_facultad INT,
    FOREIGN KEY (id_facultad) REFERENCES Facultades(id)
);

CREATE TABLE Asignaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    departamento VARCHAR(255) NOT NULL,
    semestre INT NOT NULL,
    id_carrera INT,
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id)
);

CREATE TABLE Bloques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_termino TIME NOT NULL
);

CREATE TABLE Secciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    profesor VARCHAR(255) NOT NULL,
    sala VARCHAR(255) NOT NULL,
    id_asignatura INT,
    FOREIGN KEY (id_asignatura) REFERENCES Asignaturas(id)
);

CREATE TABLE SeccionBloques (
    id_seccion INT,
    id_bloque INT,
    PRIMARY KEY (id_seccion, id_bloque),
    FOREIGN KEY (id_seccion) REFERENCES Secciones(id),
    FOREIGN KEY (id_bloque) REFERENCES Bloques(id)
);

-- aqui hay que ser bien esquizo y definir esta cosa con mil weas
CREATE TABLE Estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    rut VARCHAR(12) NOT NULL UNIQUE,
    nacimiento DATE NOT NULL,
    genero ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
    id_carrera INT,
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id)
);

-- aca como le haria para que sean limitados por nosotros??
CREATE TABLE Intereses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    topico VARCHAR(255) NOT NULL
);

CREATE TABLE EstudianteIntereses (
    id_estudiante INT,
    id_interes INT,
    PRIMARY KEY (id_estudiante, id_interes),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id),
    FOREIGN KEY (id_interes) REFERENCES Intereses(id)
);

CREATE TABLE Ventanas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT,
    id_bloque INT,
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id),
    FOREIGN KEY (id_bloque) REFERENCES Bloques(id)
);