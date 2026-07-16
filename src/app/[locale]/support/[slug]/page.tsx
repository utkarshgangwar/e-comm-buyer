import React, { use } from "react";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const page = ({ params }: Props) => {
  const { slug } = use(params);
  return (
    <div className="p-8 space-y-2">
      <h1 className="text-2xl font-bold text-green-600">{slug}</h1>
      <div className="bg-gray-100 p-4 rounded font-mono text-sm">
        <p>Current Target (slug): {slug}</p>
      </div>
    </div>
  );
};

export default page;
