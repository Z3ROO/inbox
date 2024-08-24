const PROD = import.meta.env.PROD;

//TODO: Use env variables instead of this hardcode.
const API_PORT = PROD ? '1338' : '3001';

export const API_URL = `http://localhost${API_PORT && (':'+API_PORT)}`;