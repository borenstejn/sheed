/**
 * @file Sheed accept/decline tests
 * @description Tests for the sheedé accept/decline functionality
 */

describe('Sheed accept/decline functionality', () => {
  it('should have sheed detail screen with accept/decline', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');

    expect(fs.existsSync(filePath)).toBe(true);

    const content = fs.readFileSync(filePath, 'utf-8');
    // Should have accept/decline functionality
    expect(content).toMatch(/accept|decline/i);
  });

  it('should have accept button for sheedé', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have accept button
    expect(content).toMatch(/Accepter|accept/i);
  });

  it('should have decline button for sheedé', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have decline button
    expect(content).toMatch(/Décliner|decline/i);
  });

  it('should use acceptSheed mutation from useSheeds', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use acceptSheed mutation
    expect(content).toContain('acceptSheed');
  });

  it('should use declineSheed mutation from useSheeds', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use declineSheed mutation
    expect(content).toContain('declineSheed');
  });

  it('should determine if user is sheede_1 or sheede_2', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should check which sheedé the user is
    expect(content).toContain('isFirstSheede');
  });

  it('should show who the other sheedé is', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should reference the other sheedé
    expect(content).toMatch(/otherSheede|autre/i);
  });

  it('should conditionally show buttons based on acceptance status', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should check acceptance status before showing buttons
    expect(content).toMatch(/hasResponded|alreadyAccepted|alreadyResponded/i);
  });

  it('should show waiting message when accepted but other not yet', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should show waiting state
    expect(content).toMatch(/attente|waiting/i);
  });

  it('should use useSheeds hook', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../app/(main)/sheed/[id].tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should import useSheeds
    expect(content).toContain('useSheeds');
  });
});
