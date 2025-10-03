"use client";

import { AnimatePresence, motion, scale } from "framer-motion";
import { usePathname } from "next/navigation";
import ClientWrapper from "./ClientWrapper";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import FrozenRoute from "./FrozenRoute";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  const variants = {
    initial: { x: 800, opacity: 0, scale: 0 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -800, opacity: 0, scale: 0 },
  };

  return (
    <ClientWrapper>
      <AnimatePresence mode="popLayout">
        {children && (
          <motion.div
            key={pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            className="container"
            style={{ opacity: 0 }}
          >
            <FrozenRoute>{children}</FrozenRoute>
          </motion.div>
        )}
      </AnimatePresence>
    </ClientWrapper>
  );
}
