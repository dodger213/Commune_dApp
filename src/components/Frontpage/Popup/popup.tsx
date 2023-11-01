import React, { useEffect } from "react";

import classes from "./popup.module.css";
import classNames from "classnames";

export default function Popup({ children, className, onClose, isOpen }) {
  useEffect(() => {
    if (isOpen) {
      //disable scrolling
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classNames(classes.popup, "my-auto mx-auto z-40 bg-gray-100 rounded-lg border-2 border-zinc-700 dark:border-gray-100 border-solid shadow-md", className)} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
