const request = require('supertest');
const app = require('../src/server');

describe('Pruebas de Integración de la API', () => {
  it('Debe responder 200 OK en el endpoint /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('UP');
  });

  it('Debe crear un nuevo item via POST /api/items', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Item de prueba' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});