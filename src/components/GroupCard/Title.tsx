"use client";

import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  const t = useTranslations("home");

  return (
    <span
      className="inline-block w-full text-base sm:text-lg md:text-xl font-semibold tracking-wider text-neutral-900 uppercase mb-2 truncate whitespace-nowrap"
      title={t(title)}
    >
      {t(title)}
    </span>
  );
};

export default Title;
