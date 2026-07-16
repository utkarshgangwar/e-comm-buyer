// app/[locale]/shop/search/page.tsx

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, category } = await searchParams;

  return (
    <div className="p-6">
      <h1>Search Results</h1>
      <p>
        Showing results for: <strong>{q || "All Products"}</strong>
      </p>
      {category && <p>Category: {category}</p>}
    </div>
  );
}
