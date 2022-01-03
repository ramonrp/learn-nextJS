import Link from "next/link";
import Image from "next/image";
import styles from "card.module.css";
const Card = (title, img, href) => {
  return (
    <div>
      <Link href={href}>
        <a>
          <h2>{title}</h2>
          <Image src={img} alt={title} width={260} height={260}></Image>
        </a>
      </Link>
    </div>
  );
};

export default Card;
