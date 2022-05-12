import { version } from "../package.json";

export { TCCBubbleCard } from "./cards/tcc-bubble/tcc-bubble";
export { TCCCameraCard } from "./cards/tcc-camera/tcc-camera";
export { TCCRoomCard } from "./cards/tcc-room/tcc-room";
export { TCCSpeedtestCard } from "./cards/tcc-speedtest/tcc-speedtest";

// Message when loaded in log
console.info(
  `%c✨ Tom's Custom Cards ✨ \n%cDev version ${version} Instaled!`, 
  "color: white; font-weight: 700;" ,
  "color: gray; font-weight: 100;"
)