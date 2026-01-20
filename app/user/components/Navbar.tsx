export default function Navbar() {
  return (
    <header className="bg-white border-b-1 border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md">
          <span className="text-lg">☭</span>
          <span className="text-sm font-semibold">CPI(M) Kaithode</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="/user" className="text-red-600">Home</a>
          <a href="/user/welfare" className="text-red-300" >Welfare Scheme</a>
          <a href="#" className="text-red-300">About us</a>
          <a href="#" className="text-red-300">News & Updates</a>
        </nav>

        {/* Admin Login */}
        <button className="bg-red-600 text-white px-5 py-2 rounded-md text-sm font-semibold">
          Admin Login
        </button>
      </div>
    </header>
  );
}
