import "./App.css";
import useWindowDimensions from "./helpers/getViewport";
import Canvas from "./components/canvas/canvas";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Settings from "./components/settings/settings";
import { useState } from "react";
import { setSettingsOptions } from "./store/reducers/canvasSlice";

function App() {
  const { height, width } = useWindowDimensions();
  const { size, spawnCount } = useAppSelector((state) => state.canvas.settings);
  const [isVisible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const submitSettings = (size: number, spawnCount: number) => {
    const params = { spawnCount, size };
    dispatch(setSettingsOptions(params));
  };

  return (
    <>
      <Canvas
        width={width}
        height={height}
        size={size}
        spawnCount={spawnCount}
      />
      <Settings
        isVisible={isVisible}
        setVisible={setVisible}
        size={size}
        spawnCount={spawnCount}
        submit={submitSettings}
      />
    </>
  );
}

export default App;
