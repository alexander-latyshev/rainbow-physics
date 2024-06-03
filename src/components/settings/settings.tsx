import { TbSettings } from "react-icons/tb";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "./settings.css";
import SettingsItem from "./settingsItem";
import { IoIosClose } from "react-icons/io";

type Props = {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  spawnCount: number;
  size: number;
  submit: any;
};

const Settings = (props: Props) => {
  const { isVisible, setVisible, spawnCount, size, submit } = props;
  const [sizeValue, setSizeValue] = useState<number>(size);
  const [countValue, setCountValue] = useState<number>(spawnCount);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (isVisible && ref.current && !ref.current.contains(e.target as Node))
      setVisible(false);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.code === "Escape") setVisible(!isVisible);
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClickOutside, true);
    document.body.addEventListener("keydown", handleKeydown, false);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside, true);
      document.body.removeEventListener("keydown", handleKeydown, false);
    };
  });

  return (
    <div className="settings-canvas" ref={ref}>
      <TbSettings size={40} onClick={() => setVisible(!isVisible)} />

      <div
        className={`${!isVisible ? "settings-modal_hidden" : "settings-modal"}`}
      >
        <button
          className="settings-canvas__close-btn"
          onClick={() => setVisible(false)}
        >
          Esc
          <IoIosClose size={40} />
        </button>
        <SettingsItem name="size" value={sizeValue} setValue={setSizeValue} />
        <SettingsItem
          name="count"
          value={countValue}
          setValue={setCountValue}
        />
        <button
          onClick={() => {
            submit(sizeValue, countValue);
            setVisible(false);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Settings;
