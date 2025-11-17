import Categories from "@/sections/categories/view/categories.";
import React from 'react';


export const metadata = {
    title: 'Categories | Baso Spark',
}

export default async function CategoriesPage({
  params,
}: {
  params: { sluq: string };
}) {
  const { sluq } = params;
  return <Categories slug={sluq} />;
}