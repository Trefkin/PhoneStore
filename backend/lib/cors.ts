export function setCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // DEV üçün açıq, PROD-da domen ilə əvəzlənə bilər
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
