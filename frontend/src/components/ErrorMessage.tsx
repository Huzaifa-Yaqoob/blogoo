export default function ErrorMessage({ ...props }) {
  return <div className="text-red-500 font-bold">{props.message}</div>;
}
