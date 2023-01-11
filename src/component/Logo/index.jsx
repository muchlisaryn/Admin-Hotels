import { logoHotels } from "../../asset/img";

export default function Logo({ size }) {
  return (
    <>
      <img src={logoHotels} style={{ width: size }} />
    </>
  );
}
