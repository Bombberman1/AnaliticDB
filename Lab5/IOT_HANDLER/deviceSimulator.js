const { Client, Message } = require('azure-iot-device');
const { Mqtt } = require('azure-iot-device-mqtt');
const devices = require('./devices.json');


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

function hasSignificantChange(prev, curr, threshold = 0.05) {
    for (const key of Object.keys(curr)) {
        const prevVal = prev[key];
        const currVal = curr[key];
        if (Math.abs(currVal - prevVal) > threshold * Math.abs(prevVal)) {
            return true;
        }
    }
    return false;
}

function simulateDevice(device) {
    const client = Client.fromConnectionString(device.conn, Mqtt);
    let state = initialState();

    client.open((err) => {
        if (err) {
            console.error(`${device.id} Connection Error:`, err.toString());
            return;
        }

        console.log(`${device.id} Connected to IoT Hub`);

        let isFirst = true;
        let dropped = 0;

        function sendTelemetry() {
            const newState = {
                pitch_angle: limitChange(state.pitch_angle),
                rotor_rpm: limitChange(state.rotor_rpm),
                vibration: limitChange(state.vibration),
                azimuth_position: limitChange(state.azimuth_position)
            };

            const data = {
                turbine_id: device.id,
                timestamp: new Date().toISOString(),
                pitch_angle: +newState.pitch_angle.toFixed(2),
                rotor_rpm: +newState.rotor_rpm.toFixed(2),
                vibration: +newState.vibration.toFixed(3),
                azimuth_position: +newState.azimuth_position.toFixed(2)
            };

            if (isFirst || hasSignificantChange(state, newState)) {
                isFirst = false;
                state = newState;
                const message = new Message(JSON.stringify(data));
                console.log(`${device.id}:`, data);
                client.sendEvent(message, (err) => {
                    if (err) {
                        console.error(`${device.id} Send Error:`, err.toString());
                    }
                });
            } else {
                dropped++;
                console.log(`${device.id}: Weak Changes (Dropped count: ${dropped})`);
            }

            const delay = Math.floor(Math.random() * (56 - 17 + 1)) + 17;
            setTimeout(sendTelemetry, delay * 1000);
        }

        sendTelemetry();
    });
}

devices.forEach(simulateDevice);
