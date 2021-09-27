export default function OutboundLink(props) {
  return (
    <a
      href={props.href}
      alt={props.children}
      rel="nofollow"
      target="_blank"
      className={`underline ${props.className}`}
    >
      {props.children}
    </a>
  );
}
