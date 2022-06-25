import DeviceDetector from "device-detector-js";

export const getClientInfo = (userAgent: string) => {
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(userAgent);
  return device;
};
