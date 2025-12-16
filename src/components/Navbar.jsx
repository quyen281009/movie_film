const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="navbar-search"
      />
    </nav>
  );
};

export default Navbar;
