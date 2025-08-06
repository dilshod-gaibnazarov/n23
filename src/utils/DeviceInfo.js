import DeviceDetector from "node-device-detector";
import CryptoJS from "crypto-js";
import config from "../config/index.js";

const deviceDetector = new DeviceDetector();

class DeviceInfo {
    encrypt(userAgent) {
        const device = deviceDetector.detect(userAgent);
        const info = {
            osName: device.os?.name ?? '',
            clientType: device.client?.type ?? '',
            clientName: device.client?.name ?? '',
            deviceType: device.device?.type ?? ''
        };
        const signature = `${info.osName}-${info.clientType}-${info.clientName}-${info.deviceType}-${Date.now()}`;
        const deviceId = CryptoJS.AES.encrypt(signature, config.CRYPTO_SECRET_KEY).toString();
        info.deviceId = deviceId;
        return info;
    }

    decrypt(deviceId) {
        const decrypt = CryptoJS.AES.decrypt(deviceId, config.CRYPTO_SECRET_KEY);
        const data = decrypt.toString(CryptoJS.enc.Utf8);
        return data;
    }
}

export default new DeviceInfo();
