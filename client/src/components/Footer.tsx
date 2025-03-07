export const Footer = () => {
  return (
    <>
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md mr-2">
                  <span className="text-white font-bold text-sm">SI</span>
                </div>
                <span className="text-xl font-bold text-white">SkinIntel</span>
              </div>
              <p className="mb-4">
                Advanced AI-powered skin disease detection for healthcare
                professionals.
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} SkinIntel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
