"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

import { FaRegUser } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";
import Link from "next/link";

export default function SignInPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      setEmail("");
      setPassword("");
      router.push("/"); // після логіну → на головну
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginform}>
          <h1>LOGIN</h1>
          <div className={styles.formControl}>
            <label htmlFor="email">E-mail</label>
            <div
              className={
                error
                  ? `${styles.inputWrapper} ${styles.inputError}`
                  : styles.inputWrapper
              }
            >
              <input
                type="text"
                id="email"
                placeholder="E-mail"
                value={email || ""}
                className={error ? styles.inputError : ""}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setError("")}
              />
              <FaRegUser />
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <div
              className={
                error
                  ? `${styles.inputWrapper} ${styles.inputError}`
                  : styles.inputWrapper
              }
            >
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setError("")}
              />
              <LuKeyRound />
            </div>
          </div>
          {/* <p className={styles.forgot}>Forgot password?</p> */}
          <div className={styles.buttonControl}>
            <button onClick={handleSubmit}>Login</button>
            <button
              className={styles.loginwithgoogle}
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login with <img src="/img/google.png" alt="" />
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <h2>
          <Link href="/auth/signup">REGISTRATION</Link>
        </h2>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4">Увійти</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          required
          className="border p-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Увійти
        </button>
      </form>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-red-500 text-white p-2 rounded mt-4"
      >
        Увійти через Google
      </button>

      <p className="mt-4 text-sm">
        Немає акаунта?{" "}
        <a href="/auth/signup" className="text-blue-600 underline">
          Зареєструватись
        </a>
      </p> */}
    </div>
  );
}
