/**
 * @file Maestro E2E flows tests
 * @description Verify Maestro E2E test files exist and are valid
 */

describe('Maestro E2E test flows', () => {
  const fs = require('fs');
  const path = require('path');
  const maestroDir = path.join(__dirname, '../../e2e/.maestro');

  it('should have maestro directory', () => {
    expect(fs.existsSync(maestroDir)).toBe(true);
  });

  it('should have full-flow.yaml orchestrator', () => {
    const filePath = path.join(maestroDir, 'full-flow.yaml');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have onboarding.yaml flow', () => {
    const filePath = path.join(maestroDir, 'onboarding.yaml');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have login.yaml flow', () => {
    const filePath = path.join(maestroDir, 'login.yaml');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have create-sheed.yaml flow', () => {
    const filePath = path.join(maestroDir, 'create-sheed.yaml');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have chat-flow.yaml flow', () => {
    const filePath = path.join(maestroDir, 'chat-flow.yaml');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have profile.yaml flow', () => {
    const filePath = path.join(maestroDir, 'profile.yaml');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  // Verify flow content quality
  it('should have valid YAML in full-flow.yaml', () => {
    const filePath = path.join(maestroDir, 'full-flow.yaml');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('appId');
    expect(content).toContain('launchApp');
    expect(content).toMatch(/runFlow.*onboarding/);
  });

  it('should have valid YAML in onboarding.yaml', () => {
    const filePath = path.join(maestroDir, 'onboarding.yaml');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('appId');
    expect(content).toMatch(/swipe|assertVisible/);
  });

  it('should have valid YAML in create-sheed.yaml', () => {
    const filePath = path.join(maestroDir, 'create-sheed.yaml');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('appId');
    expect(content).toMatch(/tapOn|inputText/);
    expect(content).toMatch(/contact|Contact/i);
  });

  it('should have valid YAML in chat-flow.yaml', () => {
    const filePath = path.join(maestroDir, 'chat-flow.yaml');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('appId');
    expect(content).toMatch(/message|Message/i);
    expect(content).toMatch(/inputText|tapOn/);
  });

  it('should have valid YAML in profile.yaml', () => {
    const filePath = path.join(maestroDir, 'profile.yaml');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('appId');
    expect(content).toMatch(/Profil|Profile|Settings|Paramètres/i);
  });
});
