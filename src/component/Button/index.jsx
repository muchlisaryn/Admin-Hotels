import { colors } from "../../utils/colors";

export default function Button({
  onClick,
  color,
  title,
  children,
  height,
  fontSize,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color === colors.blue ? colors.blue : colors.yellow,
        color: color === colors.blue ? colors.white : colors.blue,
        width: "100%",
        border: "none",
        borderRadius: 5,
        padding: height,
        fontSize: fontSize,
      }}
    >
      {children} {title}
    </button>
  );
}
