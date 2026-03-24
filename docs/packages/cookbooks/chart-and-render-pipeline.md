---
title: chart, renderx, and imgx
description: Move from chart generation to packaged render output and image conversion.
---

# chart, renderx, and imgx

This cookbook shows how visualization packages often compose.

## 1. Generate a chart

```detian
load "chart" as chart;
var#svg = chart.bar.render([{ label: "A", value: 10 }]);
```

## 2. Package it for HTML/SVG output

```detian
load "renderx" as renderx;
var#html = renderx.html.wrap(svg);
```

## 3. Rasterize if needed

```detian
load "imgx" as imgx;
var#png = imgx.raster.svg_to_png(svg, "/tmp/out.png");
```

## Typical use case

- generate chart data in Detian
- render SVG/HTML output
- optionally turn it into a file artifact for reporting workflows
