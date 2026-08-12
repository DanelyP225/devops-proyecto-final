describe('Pruebas Unitarias Básicas', () => {
  test('Verifica formateo de texto de entrada', () => {
    const input = "  devops  ";
    expect(input.trim()).toBe("devops");
  });
});