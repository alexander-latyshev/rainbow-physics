import { Dispatch, SetStateAction } from "react";
import "./settingsItem.css";

type Props = {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const SettingsItem = (props: Props) => {
  const { name, setValue, value } = props;

  return (
    <div className="settings-item">
      <span>set {name}: </span>
      <input
        className="settings-item__input"
        type="number"
        value={value}
        min={0}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
};

export default SettingsItem;
