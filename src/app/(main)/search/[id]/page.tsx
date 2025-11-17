import SearchView from '@/sections/search/view/search-view';
import React from 'react';


export const metadata = {
    title: 'Search | Baso Spark',
}

export default async function SearchPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    return <SearchView id={id} />;
}