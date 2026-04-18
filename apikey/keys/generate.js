import { v4 as uuidv4 } from "uuid";

const genAPIKey = () => {
  return uuidv4();
};

export { genAPIKey };
