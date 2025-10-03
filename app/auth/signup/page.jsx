"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

import { FaRegUser } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";
import Link from "next/link";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Помилка реєстрації");
    } else {
      router.push("/auth/signin"); // після реєстрації → на логін
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginform}>
          <div className={styles.header}>
            <h1>REGISTRATION</h1>
          </div>
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
            <button onClick={handleSubmit}>Register</button>
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
          <Link href="/auth/signin">LOGIN</Link>
        </h2>
      </div>
    </div>
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>

    //   <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Ім'я"
    //       required
    //       className="border p-2 rounded"
    //     />
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       required
    //       className="border p-2 rounded"
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Пароль"
    //       required
    //       className="border p-2 rounded"
    //     />
    //     {error && <p className="text-red-500 text-sm">{error}</p>}
    //     <button type="submit" className="bg-green-500 text-white p-2 rounded">
    //       Зареєструватись
    //     </button>
    //   </form>

    //   <p className="mt-4 text-sm">
    //     Вже є акаунт?{" "}
    //     <a href="/auth/signin" className="text-blue-600 underline">
    //       Увійти
    //     </a>
    //   </p>
    // </div>
  );
}
