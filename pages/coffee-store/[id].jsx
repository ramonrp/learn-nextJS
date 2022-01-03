import { useRouter } from "next/router";
import Link from "next/link";
const Store = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Link href="/">
        <a>Back to Home</a>
      </Link>{" "}
    </div>
  );
};

export default Store;
