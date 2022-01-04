import Link from "next/link";
import Image from "next/image";
import cls from "classnames";
import styles from "./card.module.css";
const Card = ({ title, img, href, className }) => {
  return (
    <Link href={href}>
      <a className={className}>
        <div className={cls("glass", styles.container)}>
          <h3 className={styles.cardHeader}>{title}</h3>
          <Image
            className={styles.cardImage}
            src={img}
            alt={title}
            width={260}
            height={260}
          ></Image>
        </div>
      </a>
    </Link>
  );
};

export default Card;
