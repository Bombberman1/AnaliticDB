const { Client, Message } = require('azure-iot-device');
const { Mqtt } = require('azure-iot-device-mqtt');

const devices = [
    { id: "turbine1", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine1;SharedAccessKey=TO72vgAZuO7poMIlS5ju22GCCOJGCJemaeb/YGhXYDI=" },
    { id: "turbine2", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine2;SharedAccessKey=Bw4JRqPApCDNTZ+/Gc2EL1ZdA6tc4156MzxXBcHDygI=" },
    { id: "turbine3", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine3;SharedAccessKey=g5Nzd6r/F4AyAKWhP+z4NyMsIO3y7aDNqtjUCHOjZ3E=" },
    { id: "turbine4", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine4;SharedAccessKey=J8zNxbvcRSq9NnSxuVPID6yRg6ZPbWjZcaG3e/GdosQ=" },
    { id: "turbine5", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine5;SharedAccessKey=l51TaArMjAWPv9NHQ/97ZjgFzShATfA6TSLtWPANVXk=" },
    { id: "turbine6", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine6;SharedAccessKey=zS2r72SoNOS0ND9cfQzSas0ZgeP+qMHQSqidIySTk2I=" },
    { id: "turbine7", conn: "HostName=oleg-iot-hub.azure-devices.net;DeviceId=turbine7;SharedAccessKey=DPEjAAVUsXQlDkeMZk81jawWsqJBchV0VeJ/LR/D94k=" }
];

// Початкові значення
function initialState() {
    return {
        pitch_angle: 10 + Math.random() * 5,
        rotor_rpm: 12 + Math.random() * 3,
        vibration: 0.3 + Math.random() * 0.05,
        azimuth_position: Math.random() * 360
    };
}

function limitChange(value, percent = 0.1) {
    const delta = value * percent;
    return value + (Math.random() * 2 - 1) * delta;
}

// Генерація телеметрії для кожного пристрою
function simulateDevice(device) {
    const client = Client.fromConnectionString(device.conn, Mqtt);
    let state = initialState();

    client.open((err) => {
        if (err) {
            console.error(`❌ ${device.id} помилка підключення:`, err.toString());
            return;
        }

        console.log(`✅ ${device.id} підключено до IoT Hub`);

        function sendTelemetry() {
            state.pitch_angle = limitChange(state.pitch_angle);
            state.rotor_rpm = limitChange(state.rotor_rpm);
            state.vibration = limitChange(state.vibration, 0.05);
            state.azimuth_position = (state.azimuth_position + Math.random() * 10 - 5 + 360) % 360;

            const data = {
                turbine_id: device.id,
                timestamp: new Date().toISOString(),
                pitch_angle: +state.pitch_angle.toFixed(2),
                rotor_rpm: +state.rotor_rpm.toFixed(2),
                vibration: +state.vibration.toFixed(3),
                azimuth_position: +state.azimuth_position.toFixed(2)
            };

            const message = new Message(JSON.stringify(data));
            console.log(`📤 ${device.id}:`, data);
            client.sendEvent(message, (err) => {
                if (err) {
                    console.error(`❌ ${device.id} помилка відправки:`, err.toString());
                }
            });

            const delay = Math.floor(Math.random() * (56 - 14 + 1)) + 14;
            setTimeout(sendTelemetry, delay * 1000);
        }

        sendTelemetry();
    });
}

devices.forEach(simulateDevice);
