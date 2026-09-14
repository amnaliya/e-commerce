import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1F4D3A] text-[#F7F3EB]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-wide">
            YESTERRA
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#d9e3dc]">
            Where Every Era Tells a Story. Discover timeless treasures and
            beautiful pieces from the past.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold tracking-wide">QUICK LINKS</h3>

          <div className="flex flex-col gap-3 text-sm text-[#d9e3dc]">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/collection">Collections</Link>
            <Link to="/categories">Categories</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold tracking-wide">INFORMATION</h3>

          <div className="flex flex-col gap-3 text-sm text-[#d9e3dc]">
            <Link to="/about">About Us</Link>
            <span>Shipping & Delivery</span>
            <span>Returns & Refunds</span>
            <span>Contact Us</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold tracking-wide">GET IN TOUCH</h3>

          <div className="flex flex-col gap-3 text-sm text-[#d9e3dc]">
            <p>Have questions? We're here to help.</p>

            <p>support@yestera.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ffffff33]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-[#d9e3dc] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Yesterra. All rights reserved.</p>

          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
