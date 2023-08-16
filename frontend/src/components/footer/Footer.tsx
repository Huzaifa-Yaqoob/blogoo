import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-sm p-4 space-y-2 bg-accent">
      <section className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <div>
          <h5 className="font-bold">Important Links:</h5>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/">profile</Link>
            </li>
            <li>
              <Link to="/">favorite blogs</Link>
            </li>
            <li>
              <Link to="/">my blogs</Link>
            </li>
            <li>
              <Link to="/">add blogs</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Contact Information:</h5>
          <ul>
            <li>
              <a>github</a>
            </li>
            <li>
              <a>facebook</a>
            </li>
            <li>
              <a>instagram</a>
            </li>
            <li>
              <a>whatsapp</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Credit:</h5>
          <ul>
            <li>
              <a>lucid icons</a>
            </li>
            <li>
              <a>google fonts</a>
            </li>
            <li>
              <a>me</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold">i don`t know:</h5>
          <ul>
            <li>
              <a>meow</a>
            </li>
          </ul>
        </div>
      </section>
      <section className="text-center text-xs">
        All content and materials on this website are protected by copyright and
        intellectual property laws. Unauthorized use, reproduction, or
        distribution of any content or materials without the express written
        permission of the owner is strictly prohibited.
        <strong> ©2023 Blogoo. </strong>All rights reserved."
      </section>
    </footer>
  );
}
