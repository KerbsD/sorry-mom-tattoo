import styles from "./HeaderButton.module.scss";
import { CircleArrowRight } from "lucide-react";

function HeaderButton() {
  return (
    <button className={styles["header-button--main"]}>
      <span className={styles["header-button--span"]}>BOOK NOW</span>
      <CircleArrowRight size={20} />
    </button>
  );
}

export default HeaderButton;
