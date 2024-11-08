const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center p-4 bg-transparent text-white border-t border-t-bloodRed">
      <div className="flex w-full justify-between">
        <div className="flex justify-center w-1/2 space-x-4 md:space-x-10"></div>
        <div className="flex justify-center w-1/2 space-x-4 md:space-x-10"></div>
      </div>
      <div className="mt-2 text-sm text-gray-400 text-center md:text-left">
        © {new Date().getFullYear()} Thriller Mania. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
