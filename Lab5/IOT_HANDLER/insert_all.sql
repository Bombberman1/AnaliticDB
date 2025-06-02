INSERT INTO Turbines (name, latitude, longitude, location) VALUES
('Turbine #1', 49.8397, 24.0297, 'Lviv'),
('Turbine #2', 50.4501, 30.5234, 'Kyiv'),
('Turbine #3', 48.4647, 35.0462, 'Dnipro'),
('Turbine #4', 46.4825, 30.7233, 'Odesa');

INSERT INTO Sensors (turbine_id, sensor_type, unit, manufacturer, parameter) VALUES
(1, 'Mechanical', 'deg', 'Siemens', 'pitch_angle'),
(1, 'Mechanical', 'rpm', 'GE', 'rotor_rpm'),
(1, 'Mechanical', 'g', 'Bosch', 'vibration'),
(1, 'Mechanical', 'deg', 'Nordex', 'azimuth_position');

INSERT INTO Sensors (turbine_id, sensor_type, unit, manufacturer, parameter) VALUES
(2, 'Meteo', 'm/s', 'Vaisala', 'wind_speed'),
(2, 'Meteo', 'deg', 'Vaisala', 'wind_direction'),
(2, 'Meteo', '°C', 'Vaisala', 'air_temperature'),
(2, 'Meteo', '%', 'Vaisala', 'humidity');

INSERT INTO Sensors (turbine_id, sensor_type, unit, manufacturer, parameter) VALUES
(3, 'Electrical', 'kW', 'ABB', 'output_power'),
(3, 'Electrical', 'rpm', 'GE', 'rotor_rpm'),
(3, 'Electrical', 'kW', 'ABB', 'max_output_power'),
(3, 'Electrical', '%', 'GE', 'power_limit_percent');

INSERT INTO Sensors (turbine_id, sensor_type, unit, manufacturer, parameter) VALUES
(4, 'Marine', 'm', 'OceanSensor', 'wave_height'),
(4, 'Marine', 'deg', 'OceanSensor', 'wave_direction'),
(4, 'Marine', 's', 'OceanSensor', 'wave_period'),
(4, 'Marine', 'm', 'OceanSensor', 'sea_state');
