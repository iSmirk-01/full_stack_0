import Link from "next/link"

interface Props {
    href: string;
    text: string;
}

function LinkLi({ href, text }: Props) {
  return (
    <Link className="cursor-pointer" href={href}>
      <li className="font-semibold">{text}</li>
    </Link>
  );
}

export default LinkLi
