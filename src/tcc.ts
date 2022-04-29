import { version } from "../package.json";

export { TCCRoomCard } from "./cards/tcc-room/tcc-room";
export { TCCBubbleCard } from "./cards/tcc-bubble/tcc-bubble";

// Message when loaded in log
console.info(
  `%c✨ Tom's Custom Cards ✨ \n%cDev version ${version} Instaled!`, 
  "color: white; font-weight: 700;" ,
  "color: gray; font-weight: 100;"
)