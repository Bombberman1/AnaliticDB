CREATE TABLE Turbines (
    id INT PRIMARY KEY IDENTITY,
    name NVARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    location NVARCHAR(100)
);

CREATE TABLE Sensors (
    id INT PRIMARY KEY IDENTITY,
    turbine_id INT FOREIGN KEY REFERENCES Turbines(id),
    sensor_type NVARCHAR(50),
    parameter NVARCHAR(50),
    unit NVARCHAR(20),
    manufacturer NVARCHAR(100),
);
