import { colors } from "../../utils/colors";

export default function Button({
  onClick,
  color,
  title,
  children,
  height,
  fontSize,
  marginRight,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: color === colors.blue ? colors.white : colors.blue,
        width: "100%",
        border: "none",
        borderRadius: 5,
        padding: height,
        fontSize: fontSize,
        marginRight: marginRight,
      }}
    >
      {children} {title}
    </button>
  );
}
