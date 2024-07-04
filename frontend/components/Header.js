import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          blog
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"posts/create"}>create</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
