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

  /**
   * Analyzes the complexity of the project by evaluating each source file.
   *
   * This function starts by retrieving a list of source files, then iterates over each file to analyze its complexity metrics.
   * If any file analysis fails, it logs a warning. After collecting all metrics, it generates a report and saves it.
   */
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

  /**
   * Retrieves TypeScript and TSX source files excluding test and spec files.
   */
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

  /**
   * Analyzes a file and returns its complexity metrics, including cyclomatic, cognitive, lines of code, maintainability index, Halstead metrics, dependencies, and test coverage.
   */
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

  /**
   * Computes the cyclomatic complexity of a given code content.
   */
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

  /**
   * Calculates the cognitive complexity of a given code block.
   *
   * This function evaluates each line of the provided content to determine the cognitive complexity by analyzing nesting levels,
   * control structures, logical operators, and recursive calls. It adjusts the complexity score based on these factors.
   */
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

  /**
   * Determines the count of non-empty lines in an array of strings,
   * excluding comments and single-line asterisks.
   *
   * Filters out empty lines, lines starting with `//`, `/*`,
   * and `*` to compute the actual number of code lines.
   *
   * @param lines - An array of strings representing individual lines of code.
   */
  private calculateLinesOfCode(lines: string[]): number {
    return lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             !trimmed.startsWith('//') && 
             !trimmed.startsWith('/*') && 
             !trimmed.startsWith('*');
    }).length;
  }

  /**
   * Computes the maintainability index based on code content.
   */
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

  /**
   * Computes Halstead metrics from a given content string.
   */
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

  /**
   * Counts the number of import and require statements in the given content.
   */
  private calculateDependencies(content: string): number {
    const importMatches = content.match(/^import\s+.*?from\s+['"].*?['"]/gm) || [];
    const requireMatches = content.match(/require\s*\(['"].*?['"]\)/g) || [];
    
    return importMatches.length + requireMatches.length;
  }

  /**
   * Retrieves the test coverage percentage for a given file path from Jest coverage reports.
   *
   * This function reads the coverage data from the 'coverage-final.json' file generated by Jest,
   * parses it, and calculates the statement coverage percentage for the specified file. If the
   * coverage file does not exist or if the file is not found in the coverage data, it returns undefined.
   */
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

  /**
   * Determines if a given line of code contains a recursive call.
   *
   * This function uses a simple heuristic to detect recursive calls by checking if the line includes
   * any function name followed by an opening parenthesis. It first extracts all potential function names
   * from the content using regex, then checks if the specified line contains any of these functions being called.
   */
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

  /**
   * Generates a report summarizing the complexity metrics of files.
   *
   * This function calculates average cyclomatic and maintainability complexities,
   * identifies files exceeding specified thresholds, generates recommendations,
   * and returns a comprehensive report object including summaries and sorted file details.
   */
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

  /**
   * Generates a list of recommendations based on code complexity metrics.
   *
   * This function evaluates various complexity metrics such as cyclomatic complexity, maintainability index,
   * dependency count, and test coverage to generate actionable recommendations. It checks each metric against predefined thresholds
   * and appends relevant messages to the recommendations list if any threshold is exceeded. If no issues are found, it confirms
   * that the code complexity is within acceptable ranges.
   *
   * @param metrics - An array of objects containing various complexity metrics for different files or modules.
   * @returns An array of string recommendations based on the evaluated metrics.
   */
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

  /**
   * Calculates the technical debt based on the provided complexity metrics.
   *
   * This function computes the total cyclomatic complexity from the given metrics,
   * compares it to an ideal complexity, and estimates the technical debt in hours.
   * The debt is categorized as Low, Medium, or High based on the calculated hours.
   * The ideal average complexity per metric is assumed to be 5.
   *
   * @param metrics - An array of ComplexityMetrics objects containing cyclomatic complexity scores.
   */
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

  /**
   * Saves a complexity report to disk and generates an HTML report.
   */
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

  /**
   * Generates and saves an HTML report to a specified directory.
   */
  private async generateHtmlReport(report: ComplexityReport, reportsDir: string): Promise<void> {
    const htmlContent = this.generateHtmlContent(report);
    const htmlPath = path.join(reportsDir, 'complexity-report.html');
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`📄 HTML report saved to: ${htmlPath}`);
  }

  /**
   * Generates an HTML content string for a code complexity analysis report.
   */
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

  /**
   * Determines the complexity class based on a given value and threshold.
   *
   * This function evaluates the input `value` against the provided `threshold`
   * and assigns it to one of three categories: 'complexity-high', 'complexity-medium',
   * or 'complexity-low'. The categorization is based on whether the `value` exceeds
   * 1.5 times the `threshold` for high complexity, exceeds the `threshold` for medium
   * complexity, or falls below these marks for low complexity.
   *
   * @param value - The numerical value to evaluate against the threshold.
   * @param threshold - The threshold used to determine the complexity class.
   */
  private getComplexityClass(value: number, threshold: number): string {
    if (value > threshold * 1.5) return 'complexity-high';
    if (value > threshold) return 'complexity-medium';
    return 'complexity-low';
  }

  /**
   * Determines the maintainability class based on a given value.
   *
   * This function evaluates the input value and assigns it to one of three categories:
   * 'complexity-high', 'complexity-medium', or 'complexity-low'. The classification is
   * based on predefined thresholds: values less than 50 are categorized as high complexity,
   * values between 50 (inclusive) and 70 (exclusive) as medium complexity, and values 70
   * and above as low complexity.
   *
   * @param value - A numerical value representing the maintainability score.
   */
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
