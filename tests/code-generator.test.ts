import { describe, it, expect } from 'vitest';
import { generatePolyglotScripts } from '../src/domain/code-generators/polyglot-generator';

describe('Polyglot Scientific Code Generator', () => {
  it('generates self-contained Python, R, and LaTeX scripts', () => {
    const scripts = generatePolyglotScripts(1, -4, 3, -10, 10);

    // Python checks
    expect(scripts.pythonNumPyMatplotlib).toContain('import numpy as np');
    expect(scripts.pythonNumPyMatplotlib).toContain('import matplotlib.pyplot as plt');
    expect(scripts.pythonNumPyMatplotlib).toContain('a = 1');
    expect(scripts.pythonNumPyMatplotlib).toContain('b = -4');
    expect(scripts.pythonNumPyMatplotlib).toContain('c = 3');

    // R checks
    expect(scripts.rGgplot2).toContain('library(ggplot2)');
    expect(scripts.rGgplot2).toContain('a <- 1');
    expect(scripts.rGgplot2).toContain('b <- -4');
    expect(scripts.rGgplot2).toContain('geom_line');

    // LaTeX checks
    expect(scripts.latexPgfplotsTikz).toContain('\\documentclass[tikz,border=5mm]{standalone}');
    expect(scripts.latexPgfplotsTikz).toContain('\\usepackage{pgfplots}');
    expect(scripts.latexPgfplotsTikz).toContain('\\addplot[domain=-10:10');
  });
});
