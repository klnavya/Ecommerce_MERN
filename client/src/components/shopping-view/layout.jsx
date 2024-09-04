import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout({isHeaderFixed}) {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader isHeaderFixed={isHeaderFixed} />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
