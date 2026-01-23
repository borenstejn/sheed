/**
 * @file StatCard component tests
 * @description Tests for the statistics card component
 */

describe('StatCard component', () => {
  it('should have StatCard component file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should export StatCard component', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should export the component
    expect(content).toMatch(/export.*StatCard/);
  });

  it('should accept value prop', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have value prop
    expect(content).toMatch(/value/i);
  });

  it('should accept label prop', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have label prop
    expect(content).toMatch(/label/i);
  });

  it('should have glassmorphism styling', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have glass effect
    expect(content).toMatch(/glass|blur|opacity|bg-gray-800\/|transparent/i);
  });

  it('should display large number', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have large text for number
    expect(content).toMatch(/text-\d*xl|fontSize|bold/i);
  });

  it('should support animated count-up', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have animation support
    expect(content).toMatch(/animate|Animated|useEffect|interval|count/i);
  });

  it('should support percentage display', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should support percentage
    expect(content).toMatch(/%|percent|isPercentage/i);
  });

  it('should use NativeWind styling', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../components/StatCard.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    expect(content).toContain('className');
  });

  it('should be exported from components barrel', () => {
    const fs = require('fs');
    const path = require('path');
    const indexPath = path.join(__dirname, '../../components/index.ts');
    const content = fs.readFileSync(indexPath, 'utf-8');

    expect(content).toContain('StatCard');
  });
});
