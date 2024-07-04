import { login } from "@/lib/api/auth";
import { useState } from "react";
import { useSession } from "@/lib/hooks/session";
import { useRouter } from "next/router";

export default function LoginForm() {
  const { session, isSignedIn, signIn, signOut } = useSession();
  const [model, setModel] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setModel({
      ...model,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        email: model.email,
        password: model.password,
      });
      signIn(data);
      alert("successfully logged in");
      console.log(data);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <pre>{JSON.stringify(model, null, 4)}</pre>

      <form onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={model.email}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            name="password"
            onChange={handleChange}
            value={model.password}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
