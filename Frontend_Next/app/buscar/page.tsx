import SearchClient from "./SearchClient";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q ?? "";

    return <SearchClient query={query} />;
}

