const request = require('supertest');
const app = require('../src/server');
const db = require('../src/database');

describe('Pruebas de Integración CRUD de la API', () => {
  let createdItemId;

  afterAll((done) => {
    db.close(done);
  });

  it('Debe responder 200 OK en el endpoint /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('UP');
  });

  it('Debe crear un nuevo item (POST /api/items)', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Item Inicial' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdItemId = res.body.id;
  });

  it('Debe listar todos los items (GET /api/items)', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Debe actualizar el item creado (PUT /api/items/:id)', async () => {
    const res = await request(app)
      .put(`/api/items/${createdItemId}`)
      .send({ name: 'Item Modificado' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Item Modificado');
  });

  it('Debe eliminar el item creado (DELETE /api/items/:id)', async () => {
    const res = await request(app).delete(`/api/items/${createdItemId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});