import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Products',
      links: [
        { href: '/psalion-yield', label: 'Psalion Yield' },
        { href: '/psalion-vc', label: 'Psalion VC' },
        { href: '/bespoke-services', label: 'Bespoke Services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/team', label: 'Team' },
        { href: '/clients', label: 'Clients' },
        { href: '/press', label: 'Press Mentions' },
        { href: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/legal/privacy', label: 'Privacy Policy' },
        { href: '/legal/terms', label: 'Terms of Service' },
        { href: '/legal/cookies', label: 'Cookie Policy' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-lg">Psalion</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Professional investment solutions for institutional and high-net-worth clients.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Psalion. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/legal/privacy"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Terms
            </Link>
            <Link
              href="/legal/cookies"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
