import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ComplexityMetrics {
  file: string;
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  linesOfCode: number;
  maintainabilityIndex: number;
  halsteadMetrics: HalsteadMetrics;
  dependencies: number;
  testCoverage: number | undefined;
}

interface HalsteadMetrics {
  vocabulary: number;
  length: number;
  difficulty: number;
  effort: number;
  bugs: number;
}

interface ComplexityReport {
  summary: {
    totalFiles: number;
    averageComplexity: number;
    highComplexityFiles: string[];
    maintainabilityScore: number;
    technicalDebt: string;
  };
  files: ComplexityMetrics[];
  recommendations: string[];
}

class CodeComplexityAnalyzer {
  private complexityThresholds: {
    cyclomatic: number;
    cognitive: number;
    maintainability: number;
  };

  constructor() {
    this.complexityThresholds = {
      cyclomatic: 10,
      cognitive: 15,
      maintainability: 70
    };
  }

  async analyzeProject(): Promise<ComplexityReport> {
    console.log('🔍 Starting code complexity analysis...');
    
    const files = await this.getSourceFiles();
    const metrics: ComplexityMetrics[] = [];
    
    for (const file of files) {
      try {
        const fileMetrics = await this.analyzeFile(file);
        metrics.push(fileMetrics);
      } catch (error) {
        console.warn(`⚠️  Failed to analyze ${file}: ${error}`);
      }
    }
    
    const report = this.generateReport(metrics);
    await this.saveReport(report);
    
    return report;
  }

  private async getSourceFiles(): Promise<string[]> {
    const patterns = [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/*.test.ts',
      '!src/**/*.test.tsx',
      '!src/**/*.spec.ts',
      '!src/**/*.spec.tsx'
    ];
    
    return glob(patterns, { cwd: process.cwd() });
  }

  private async analyzeFile(filePath: string): Promise<ComplexityMetrics> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    return {
      file: filePath,
      cyclomaticComplexity: this.calculateCyclomaticComplexity(content),
      cognitiveComplexity: this.calculateCognitiveComplexity(content),
      linesOfCode: this.calculateLinesOfCode(lines),
      maintainabilityIndex: this.calculateMaintainabilityIndex(content),
      halsteadMetrics: this.calculateHalsteadMetrics(content),
      dependencies: this.calculateDependencies(content),
      testCoverage: await this.getTestCoverage(filePath)
    };
  }

  private calculateCyclomaticComplexity(content: string): number {
    // Count decision points: if, else, while, for, case, catch, &&, ||
    const patterns = [
      /\bif\s*\(/g,
      /\belse\s+if\b/g,
      /\bwhile\s*\(/g,
      /\bfor\s*\(/g,
      /\bcase\s+/g,
      /\bcatch\s*\(/g,
      /\?/g, // ternary operator
      /&&/g,
      /\|\|/g
    ];
    
    let complexity = 1; // Base complexity
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    });
    
    return complexity;
  }

  private calculateCognitiveComplexity(content: string): number {
    let complexity = 0;
    let nestingLevel = 0;
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Increment nesting for blocks
      if (trimmed.includes('{')) nestingLevel++;
      if (trimmed.includes('}')) nestingLevel = Math.max(0, nestingLevel - 1);
      
      // Add complexity for control structures
      if (/\b(if|else if|while|for|case|catch)\b/.test(trimmed)) {
        complexity += 1 + nestingLevel;
      }
      
      // Add complexity for logical operators
      const logicalOps = (trimmed.match(/&&|\|\|/g) || []).length;
      complexity += logicalOps;
      
      // Add complexity for recursion
      if (this.isRecursiveCall(trimmed, content)) {
        complexity += 1;
      }
    }
    
    return complexity;
  }

  private calculateLinesOfCode(lines: string[]): number {
    return lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             !trimmed.startsWith('//') && 
             !trimmed.startsWith('/*') && 
             !trimmed.startsWith('*');
    }).length;
  }

  private calculateMaintainabilityIndex(content: string): number {
    const loc = this.calculateLinesOfCode(content.split('\n'));
    const complexity = this.calculateCyclomaticComplexity(content);
    const halstead = this.calculateHalsteadMetrics(content);
    
    // Maintainability Index formula
    const mi = Math.max(0, 
      171 - 
      5.2 * Math.log(halstead.vocabulary) - 
      0.23 * complexity - 
      16.2 * Math.log(loc)
    );
    
    return Math.round(mi * 100) / 100;
  }

  private calculateHalsteadMetrics(content: string): HalsteadMetrics {
    // Simplified Halstead metrics calculation
    const operators = content.match(/[+\-*/=<>!&|^%~?:;,(){}\[\]]/g) || [];
    const operands = content.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g) || [];
    
    const uniqueOperators = new Set(operators).size;
    const uniqueOperands = new Set(operands).size;
    
    const vocabulary = uniqueOperators + uniqueOperands;
    const length = operators.length + operands.length;
    const difficulty = (uniqueOperators / 2) * (operands.length / uniqueOperands);
    const effort = difficulty * length;
    const bugs = effort / 3000;
    
    return {
      vocabulary,
      length,
      difficulty: Math.round(difficulty * 100) / 100,
      effort: Math.round(effort),
      bugs: Math.round(bugs * 1000) / 1000
    };
  }

  private calculateDependencies(content: string): number {
    const importMatches = content.match(/^import\s+.*?from\s+['"].*?['"]/gm) || [];
    const requireMatches = content.match(/require\s*\(['"].*?['"]\)/g) || [];
    
    return importMatches.length + requireMatches.length;
  }

  private async getTestCoverage(filePath: string): Promise<number | undefined> {
    try {
      // This would integrate with your Jest coverage reports
      const coverageFile = path.join(process.cwd(), 'coverage', 'coverage-final.json');
      if (fs.existsSync(coverageFile)) {
        const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf-8'));
        const absolutePath = path.resolve(filePath);
        const fileCoverage = coverage[absolutePath];
        
        if (fileCoverage) {
          const { s } = fileCoverage; // statement coverage
          const total = Object.keys(s).length;
          const covered = Object.values(s).filter((count: any) => count > 0).length;
          return total > 0 ? Math.round((covered / total) * 100) : 0;
        }
      }
    } catch (error) {
      // Coverage data not available
    }
    
    return undefined;
  }

  private isRecursiveCall(line: string, content: string): boolean {
    // Simple heuristic to detect recursive calls
    const functionMatch = content.match(/function\s+(\w+)|const\s+(\w+)\s*=|class\s+(\w+)/g);
    if (functionMatch) {
      return functionMatch.some(func => {
        const funcName = func.split(/\s+/)[1];
        return line.includes(funcName + '(');
      });
    }
    return false;
  }

  private generateReport(metrics: ComplexityMetrics[]): ComplexityReport {
    const totalFiles = metrics.length;
    const averageComplexity = metrics.reduce((sum, m) => sum + m.cyclomaticComplexity, 0) / totalFiles;
    
    const highComplexityFiles = metrics
      .filter(m => 
        m.cyclomaticComplexity > this.complexityThresholds.cyclomatic ||
        m.cognitiveComplexity > this.complexityThresholds.cognitive
      )
      .map(m => m.file);
    
    const averageMaintainability = metrics.reduce((sum, m) => sum + m.maintainabilityIndex, 0) / totalFiles;
    
    const recommendations = this.generateRecommendations(metrics);
    
    return {
      summary: {
        totalFiles,
        averageComplexity: Math.round(averageComplexity * 100) / 100,
        highComplexityFiles,
        maintainabilityScore: Math.round(averageMaintainability * 100) / 100,
        technicalDebt: this.calculateTechnicalDebt(metrics)
      },
      files: metrics.sort((a, b) => b.cyclomaticComplexity - a.cyclomaticComplexity),
      recommendations
    };
  }

  private generateRecommendations(metrics: ComplexityMetrics[]): string[] {
    const recommendations: string[] = [];
    
    const highComplexityFiles = metrics.filter(m => m.cyclomaticComplexity > this.complexityThresholds.cyclomatic);
    if (highComplexityFiles.length > 0) {
      recommendations.push(`🔴 ${highComplexityFiles.length} files have high cyclomatic complexity (>${this.complexityThresholds.cyclomatic}). Consider refactoring.`);
    }
    
    const lowMaintainabilityFiles = metrics.filter(m => m.maintainabilityIndex < this.complexityThresholds.maintainability);
    if (lowMaintainabilityFiles.length > 0) {
      recommendations.push(`🟡 ${lowMaintainabilityFiles.length} files have low maintainability index (<${this.complexityThresholds.maintainability}). Review and simplify.`);
    }
    
    const highDependencyFiles = metrics.filter(m => m.dependencies > 15);
    if (highDependencyFiles.length > 0) {
      recommendations.push(`🟠 ${highDependencyFiles.length} files have high dependency count (>15). Consider dependency injection or modularization.`);
    }
    
    const uncoveredFiles = metrics.filter(m => m.testCoverage !== undefined && m.testCoverage < 80);
    if (uncoveredFiles.length > 0) {
      recommendations.push(`🔵 ${uncoveredFiles.length} files have low test coverage (<80%). Add more tests.`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Code complexity is within acceptable ranges. Great job!');
    }
    
    return recommendations;
  }

  private calculateTechnicalDebt(metrics: ComplexityMetrics[]): string {
    const totalComplexity = metrics.reduce((sum, m) => sum + m.cyclomaticComplexity, 0);
    const idealComplexity = metrics.length * 5; // Ideal average complexity of 5
    const excessComplexity = Math.max(0, totalComplexity - idealComplexity);
    
    // Rough estimate: 1 hour per excess complexity point
    const hoursOfDebt = excessComplexity;
    
    if (hoursOfDebt < 8) {
      return `${hoursOfDebt} hours (Low)`;
    } else if (hoursOfDebt < 40) {
      return `${hoursOfDebt} hours (Medium)`;
    } else {
      return `${hoursOfDebt} hours (High)`;
    }
  }

  private async saveReport(report: ComplexityReport): Promise<void> {
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportsDir, `complexity-report-${timestamp}.json`);
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Also save a latest report
    const latestReportPath = path.join(reportsDir, 'complexity-report-latest.json');
    fs.writeFileSync(latestReportPath, JSON.stringify(report, null, 2));
    
    console.log(`📊 Complexity report saved to: ${reportPath}`);
    
    // Generate HTML report
    await this.generateHtmlReport(report, reportsDir);
  }

  private async generateHtmlReport(report: ComplexityReport, reportsDir: string): Promise<void> {
    const htmlContent = this.generateHtmlContent(report);
    const htmlPath = path.join(reportsDir, 'complexity-report.html');
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`📄 HTML report saved to: ${htmlPath}`);
  }

  private generateHtmlContent(report: ComplexityReport): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Complexity Analysis Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; }
        .metric-card { background: #f8f9fa; border-radius: 6px; padding: 20px; margin: 10px 0; border-left: 4px solid #007bff; }
        .high-complexity { border-left-color: #dc3545; }
        .medium-complexity { border-left-color: #ffc107; }
        .low-complexity { border-left-color: #28a745; }
        .file-list { max-height: 400px; overflow-y: auto; }
        .file-item { padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
        .recommendations { background: #e7f3ff; border-radius: 6px; padding: 20px; margin: 20px 0; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .chart-container { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: 600; }
        .complexity-high { color: #dc3545; font-weight: bold; }
        .complexity-medium { color: #ffc107; font-weight: bold; }
        .complexity-low { color: #28a745; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Code Complexity Analysis Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="content">
            <div class="summary-grid">
                <div class="metric-card">
                    <h3>📁 Total Files Analyzed</h3>
                    <h2>${report.summary.totalFiles}</h2>
                </div>
                <div class="metric-card">
                    <h3>📊 Average Complexity</h3>
                    <h2>${report.summary.averageComplexity}</h2>
                </div>
                <div class="metric-card">
                    <h3>🔧 Maintainability Score</h3>
                    <h2>${report.summary.maintainabilityScore}</h2>
                </div>
                <div class="metric-card">
                    <h3>⏱️ Technical Debt</h3>
                    <h2>${report.summary.technicalDebt}</h2>
                </div>
            </div>
            
            <div class="recommendations">
                <h3>💡 Recommendations</h3>
                <ul>
                    ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <h3>📋 Detailed File Analysis</h3>
            <table>
                <thead>
                    <tr>
                        <th>File</th>
                        <th>Cyclomatic Complexity</th>
                        <th>Cognitive Complexity</th>
                        <th>Lines of Code</th>
                        <th>Maintainability Index</th>
                        <th>Dependencies</th>
                        <th>Test Coverage</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.files.map(file => `
                        <tr>
                            <td>${file.file}</td>
                            <td class="${this.getComplexityClass(file.cyclomaticComplexity, 10)}">${file.cyclomaticComplexity}</td>
                            <td class="${this.getComplexityClass(file.cognitiveComplexity, 15)}">${file.cognitiveComplexity}</td>
                            <td>${file.linesOfCode}</td>
                            <td class="${this.getMaintainabilityClass(file.maintainabilityIndex)}">${file.maintainabilityIndex}</td>
                            <td>${file.dependencies}</td>
                            <td>${file.testCoverage !== undefined ? file.testCoverage + '%' : 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`;
  }

  private getComplexityClass(value: number, threshold: number): string {
    if (value > threshold * 1.5) return 'complexity-high';
    if (value > threshold) return 'complexity-medium';
    return 'complexity-low';
  }

  private getMaintainabilityClass(value: number): string {
    if (value < 50) return 'complexity-high';
    if (value < 70) return 'complexity-medium';
    return 'complexity-low';
  }
}

// CLI interface
if (require.main === module) {
  const analyzer = new CodeComplexityAnalyzer();
  
  analyzer.analyzeProject()
    .then(report => {
      console.log('\n📊 Analysis Complete!');
      console.log(`📁 Files analyzed: ${report.summary.totalFiles}`);
      console.log(`📊 Average complexity: ${report.summary.averageComplexity}`);
      console.log(`🔧 Maintainability score: ${report.summary.maintainabilityScore}`);
      console.log(`⏱️  Technical debt: ${report.summary.technicalDebt}`);
      
      if (report.summary.highComplexityFiles.length > 0) {
        console.log(`\n🔴 High complexity files (${report.summary.highComplexityFiles.length}):`);
        report.summary.highComplexityFiles.forEach(file => {
          console.log(`  - ${file}`);
        });
      }
      
      console.log('\n💡 Recommendations:');
      report.recommendations.forEach(rec => {
        console.log(`  ${rec}`);
      });
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}

export { CodeComplexityAnalyzer };
export type { ComplexityMetrics, ComplexityReport };
