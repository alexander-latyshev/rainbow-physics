import React from "react";

import "./canvas.css";

type Props = {
  width: number;
  height: number;
  size: number;
  spawnCount: number;
};

const Canvas: React.FC<Props> = (props: Props) => {
  const { height, width, size, spawnCount } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  let grid: number[][];
  let cols: number, rows: number;

  function set2DMatrix(cols: number, rows: number): number[][] {
    const arr: number[][] = [];
    for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows).fill(0);
    }

    return arr;
  }

  const clearCanvas = () => {
    grid = set2DMatrix(cols, rows);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    }
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null;

    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    cols = Math.floor(width / size);
    rows = Math.floor(height / size);
    grid = set2DMatrix(cols, rows);
    let colorValue = 1;

    function withinCols(y: number) {
      return y >= 0 && y <= cols - 1;
    }

    function withinRows(x: number) {
      return x >= 0 && x <= rows - 1;
    }

    const mouseHandler = (event: MouseEvent) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      const mouseCol = Math.floor(mouseX / size);
      const mouseRow = Math.floor(mouseY / size);

      const extent = Math.floor(spawnCount / 2);

      let rectAlreadyPlaced = false;
      for (let y = -extent; y <= extent; y++) {
        for (let x = -extent; x <= extent; x++) {
          const col = mouseCol + y;
          const row = mouseRow + x;
          if (withinCols(col) && withinRows(row) && grid[col][row] > 0) {
            rectAlreadyPlaced = true;
            break;
          }
        }
        if (rectAlreadyPlaced) break;
      }

      if (!rectAlreadyPlaced) {
        for (let y = -extent; y <= extent; y++) {
          for (let x = -extent; x <= extent; x++) {
            if (Math.random() < 0.75) {
              const col = mouseCol + y;
              const row = mouseRow + x;
              if (withinCols(col) && withinRows(row)) {
                grid[col][row] = colorValue;
              }
            }
          }
        }

        colorValue += 1;
        if (colorValue > 360) {
          colorValue = 1;
        }
      }
    };

    const draw = () => {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        for (let y = 0; y < cols; y++) {
          for (let x = 0; x < rows; x++) {
            if (grid[y][x] > 0) {
              ctx.fillStyle = `hsl(${grid[y][x]}, 100%, 50%)`;
              ctx.fillRect(y * size, x * size, size, size);
            }
          }
        }

        const nextGrid = set2DMatrix(cols, rows);
        for (let y = 0; y < cols; y++) {
          for (let x = 0; x < rows; x++) {
            let state = grid[y][x];
            if (state > 0) {
              let below = x + 1 < rows ? grid[y][x + 1] : undefined;
              let dir = Math.random() < 0.5 ? 1 : -1;
              let neighborY = withinCols(y + dir)
                ? grid[y + dir][x + 1]
                : undefined;
              let neighborX = withinCols(y - dir)
                ? grid[y - dir][x + 1]
                : undefined;
              if (below === 0) {
                nextGrid[y][x + 1] = state;
              } else if (neighborY === 0) {
                nextGrid[y + dir][x + 1] = state;
              } else if (neighborX === 0) {
                nextGrid[y - dir][x + 1] = state;
              } else {
                nextGrid[y][x] = state;
              }
            }
          }
        }
        grid = nextGrid;

        requestAnimationFrame(draw);
      }
    };

    canvas.addEventListener("mousemove", mouseHandler);
    canvas.addEventListener("click", clearCanvas);

    draw();

    return () => {
      canvas.removeEventListener("mousemove", mouseHandler);
      canvas.removeEventListener("click", clearCanvas);
    };
  }, [width, height, size, spawnCount]);

  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      height={height}
      width={width}
      onClick={() => clearCanvas}
    />
  );
};

export default Canvas;
