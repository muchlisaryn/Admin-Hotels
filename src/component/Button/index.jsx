export default function Button({
  onClick,
  color,
  title,
  children,
  height,
  fontSize,
  marginRight,
  disabled,
  backgroundColor,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: color,
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
