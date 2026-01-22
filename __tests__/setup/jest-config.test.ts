describe('Jest Configuration', () => {
  it('should run tests', () => {
    expect(true).toBe(true);
  });

  it('should have access to expect matchers', () => {
    expect(1 + 1).toBe(2);
    expect('sheed').toContain('sheed');
  });
});
