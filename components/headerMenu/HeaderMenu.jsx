"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function HeaderMenu() {
  const { data: session, status } = useSession();

  const [openMenu, setOpenMenu] = useState(false);

  const pathname = usePathname();

  if (status === "loading") {
    return (
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <p>Завантаження...</p>
      </header>
    );
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: (custom) => ({
      opacity: 0,
      y: 10,
      transition: { delay: custom * 0.2, duration: 0.4, ease: "easeInOut" },
    }),
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/logo.svg" alt="" />
        </Link>
      </div>

      <nav className={styles.headernav}>
        {session?.user ? (
          <div className={styles.user}>
            <div className={styles.userImg}>
              <img
                src={session.user.image || "/img/defaultuser.jpg"}
                alt="avatar"
                onClick={() => setOpenMenu(!openMenu)}
              />
            </div>
            <div className={styles.userMenu}>
              <ul>
                <AnimatePresence>
                  {openMenu && (
                    <>
                      <motion.li
                        key="1"
                        custom={2} // для зворотнього порядку при exit
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        transition={{
                          delay: 0.1,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        <Link href="/profile">Profile</Link>
                      </motion.li>
                      <motion.li
                        key="2"
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        <Link href="/dashboard">Dashboard</Link>
                      </motion.li>
                      <motion.li
                        key="3"
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        transition={{
                          delay: 0.5,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                      >
                        <div
                          className={styles.menuButton}
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Logout
                        </div>
                      </motion.li>
                    </>
                  )}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        ) : (
          <ul className={styles.headerNav}>
            <li>
              <Link
                href="/auth/signin"
                className={pathname == "/auth/signin" ? styles.active : ""}
              >
                Signin
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className={pathname == "/auth/signup" ? styles.active : ""}
              >
                Signup
              </Link>
            </li>
          </ul>
        )}
      </nav>
      {/* {session?.user ? (
        <div className="flex items-center gap-4">
          <img
            src={session.user.image || "/img/defaultuser.jpg"}
            alt="avatar"
            className="w-8 h-8 rounded-full border"
          />
          <span className="text-gray-700">
            {session.user.name || session.user.email}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Вийти
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Увійти
        </button>
      )} */}
    </header>
  );
}
