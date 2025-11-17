import ProductEditPage from "@/sections/admin-dashboard/view/admin-product-detail-view";
export const metadata = {
    title: 'Product Detail | Baso Spark',
}

export default function orderDetailPage({
    params
}: {
    params: { id: string }
}
) {
    const { id } = params;
    console.log(id)
    return(
        <ProductEditPage id={id} />
    );
}