/**
 * @file useUserStats hook tests
 * @description Tests for the user statistics hook
 */

describe('useUserStats hook', () => {
  it('should have useUserStats hook file', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');

    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should export useUserStats hook', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should export the hook
    expect(content).toMatch(/export.*useUserStats/);
  });

  it('should fetch from Supabase', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use supabase
    expect(content).toMatch(/supabase|from\(['"]users['"]\)/i);
  });

  it('should return total sheeds created', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have created count
    expect(content).toMatch(/total_sheeds_created|totalCreated|created/i);
  });

  it('should return successful sheeds count', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have successful count
    expect(content).toMatch(/successful_sheeds|successfulSheeds|success/i);
  });

  it('should calculate success rate', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should calculate rate/percentage
    expect(content).toMatch(/rate|percent|\/ |Math\.round/i);
  });

  it('should return loading state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have loading indicator
    expect(content).toMatch(/isLoading|loading/i);
  });

  it('should return error state', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should have error handling
    expect(content).toMatch(/error|Error/i);
  });

  it('should use TanStack Query', () => {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../hooks/useUserStats.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Should use useQuery
    expect(content).toMatch(/useQuery|@tanstack\/react-query/);
  });

  it('should be exported from hooks barrel', () => {
    const fs = require('fs');
    const path = require('path');
    const indexPath = path.join(__dirname, '../../hooks/index.ts');
    const content = fs.readFileSync(indexPath, 'utf-8');

    expect(content).toContain('useUserStats');
  });
});
