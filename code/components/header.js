import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Header() {
  const [session, loading] = useSession();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div>
        <p>
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                />
              )}
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.name || session.user.email}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/client">
              <a>Client</a>
            </Link>
          </li>
          <li>
            <Link href="/server">
              <a>Server</a>
            </Link>
          </li>
          <li>
            <Link href="/protected">
              <a>Protected</a>
            </Link>
          </li>
          <li>
            <Link href="/api-example">
              <a>API</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
