import UserList from "@/components/UserList";
import ProductList from "@/components/ProductList";
import OrderList from "@/components/OrderList";

export default function Home() {
    return (
        <div>
            <h1>Inventory Management System</h1>
            <UserList />
            <ProductList />
            <OrderList />
        </div>
    );
}
